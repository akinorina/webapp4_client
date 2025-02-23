<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue';
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripePaymentElementOptions,
  type StripePaymentElement,
} from "@stripe/stripe-js";
import { useStripeStore } from '../../stores/stripe';

import ButtonGeneralPrimary from '@/components/general/ButtonGeneralPrimary.vue';
import Webapp4Error from '@/lib/Webapp4Error';
import ModalGeneral from '@/components/general/ModalGeneral.vue';
import ButtonGeneralSecondary from '@/components/general/ButtonGeneralSecondary.vue';
import InputRadio from '@/components/general/InputRadio.vue';

const authStore = useAuthStore()
const stripeStore = useStripeStore()

// Stripeプロパティ
const publishableKey = ref('')
const stripe = ref<Stripe>()

// 価格リスト
const prices = ref()

// 価格
const targetPrice = ref()

// 顧客
const targetCustomer = ref()
const name = ref('Akinori Nakata')
const email = ref('')

// 顧客の支払い方法
const targetPaymentMethods = ref<any[]>([])

// サブスクリプション
const subscriptions = ref()

const targetSubscription = ref()

// 請求書リスト
const targetInvoices = ref()

// stripe エレメント
const clientSecret = ref('')
const elements = ref<StripeElements>()
const paymentElement = ref<StripePaymentElement>()

//
const defaultPaymentMethodId = ref<string | undefined>('')

// others
const stepName = ref('')
const messages = ref<string[]>([])
const isLoading = ref(false)

// Modal
const modalAddPaymentMethod = ref()

onMounted(async () => {
  // publishableKey 公開可能キー 設定
  const config = await stripeStore.getConfig()
  publishableKey.value = config.publishableKey

  // Stripe オブジェクト作成
  stripe.value = await loadStripe(publishableKey.value) as Stripe;

  // Prices一覧 取得
  prices.value = (await stripeStore.listPrices()).prices
  if (prices.value.length === 0) {
    throw new Webapp4Error({ type: 'system', message: '価格データが取れませんでした。' })
  }

  // サインインユーザー情報取得
  await authStore.getProfile()
  name.value = authStore.profile.username
  email.value = authStore.profile.email

  // customer を email で検索し、存在しない場合は新規作成する。
  const listCustomers = await stripeStore.listCustomersByEmail(email.value)
  if (listCustomers.customers.length > 0) {
    // 対象 email の顧客データのうち、最新を取得
    targetCustomer.value = listCustomers.customers[0]
    defaultPaymentMethodId.value = targetCustomer.value.invoice_settings.default_payment_method
  } else {
    // customer データ作成
    targetCustomer.value = (await stripeStore.createCustomer(name.value, email.value)).customer
    defaultPaymentMethodId.value = targetCustomer.value.invoice_settings.default_payment_method
  }

  // Subscription 既存から取得
  subscriptions.value = (await stripeStore.listSubscriptionByCustomer(targetCustomer.value.id, 'all'))
  if (subscriptions.value.subscriptions.length > 0) {
    targetSubscription.value = subscriptions.value.subscriptions[0]

    // サブスクリプションに関する請求書
    targetInvoices.value = await stripeStore.listInvoicesBySubscription(targetSubscription.value.id);

    // サブスクリプション表示
    if (targetSubscription.value.status === 'active' || targetSubscription.value.status === 'canceled') {
      //
      if (targetSubscription.value.status === 'canceled'
        && dayjs('2025-03-23 01:34:00').isAfter(dayjs(targetSubscription.value.ended_at * 1000))
      ) {
        stepName.value = 'create1'
        return false
      }

      // Subscription -> Price 取得
      const subscriptionPriceIds = targetSubscription.value.items.data.map((item: any) => {
        if (item.price.id) {
          return item.price.id
        }
      })
      if (subscriptionPriceIds.length !== 1) {
        throw new Webapp4Error({ type: 'system', message: 'subscription に price が 0個または複数あります。'})
      }
      // Subscription に対する Price オブジェクト
      targetPrice.value = prices.value.find((price: any) => {
        return price.id === subscriptionPriceIds[0]
      })

      // PaymentMethod 取得
      targetPaymentMethods.value = await stripeStore.listPaymentMethodsByCustomer(targetCustomer.value.id)

      // default_payment_method 未指定なら設定する
      if (targetCustomer.value.invoice_settings.default_payment_method === null) {
        const defaultPaymentMethod = (targetPaymentMethods.value as any).paymentMethods[0].id
        // default_payment_method 更新
        await stripeStore.updateCustomer(targetCustomer.value.id, {
          invoice_settings: { default_payment_method: defaultPaymentMethod }
        })

        // PaymentMethod 再取得
        targetPaymentMethods.value = await stripeStore.listPaymentMethodsByCustomer(targetCustomer.value.id)
      }

      // available 表示
      stepName.value = 'available'
      //
    } else {
      stepName.value = 'create1'
    }
  } else {
    stepName.value = 'create1'
  }
})

const submitSubscribe1 = async (selectedPriceId: string) => {
  // 選択した価格、商品情報
  const selectedPriceIndex = prices.value.findIndex((item: any) => {
    return item.id = selectedPriceId
  })
  targetPrice.value = prices.value[selectedPriceIndex]

  if (!stripe.value) {
    return false
  }

  stepName.value = 'create2'

  // Subscription 既存から取得
  subscriptions.value = (await stripeStore.listSubscriptionByCustomer(targetCustomer.value.id))
  if (subscriptions.value.subscriptions.length > 0) {
    // ある
    targetSubscription.value = subscriptions.value.subscriptions[0]
    // Client Secret 取得
    clientSecret.value = targetSubscription.value.latest_invoice.payment_intent.client_secret
  } else {
    // なし
    // subscription作成
    targetSubscription.value = await stripeStore.createSubscription(
      targetCustomer.value.id,
      targetPrice.value.id,
    )
    // Client Secret 取得
    clientSecret.value = targetSubscription.value.clientSecret
  }

  // [2]: 決済フォーム作成
  elements.value = stripe.value.elements({ clientSecret: clientSecret.value }) as StripeElements;
  const paymentOptions: StripePaymentElementOptions = {
    defaultValues: { billingDetails: { email: email.value } },
    layout: { type: 'tabs', defaultCollapsed: false }
  }
  paymentElement.value = elements.value.create('payment', paymentOptions);
  paymentElement.value.mount('#payment-element');
  // // Create and mount the linkAuthentication Element to enable autofilling customer payment details
  // const linkAuthenticationElement = elements.value.create("linkAuthentication");
  // linkAuthenticationElement.mount("#link-authentication-element");
}

const submitSubscribe2 = async () => {
  if (!elements.value) {
    return false
  }
  if (!stripe.value) {
    return false
  }

  // Confirm the payment given the clientSecret
  // from the payment intent that was just created on
  // the server.
  const {error: stripeError} = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      return_url: `${window.location.origin}/samples/payment`,
    }
  });
  if (stripeError) {
    _setMessage(stripeError.message as string);
    return;
  }
}

// 新たな支払い方法を追加する
const openModalForAddingPaymentMethod = async () => {
  if (!stripe.value) {
    return false
  }

  const setupIntent = await stripeStore.createSetupIntent(targetCustomer.value.id)
  clientSecret.value = setupIntent.setupIntent.client_secret

  // Modal表示
  await modalAddPaymentMethod.value.open()

  // [2]: 決済フォーム作成
  elements.value = stripe.value.elements({ clientSecret: clientSecret.value }) as StripeElements;
  const paymentOptions: StripePaymentElementOptions = {
    defaultValues: { billingDetails: { email: email.value } },
    layout: { type: 'tabs', defaultCollapsed: false }
  }
  paymentElement.value = elements.value.create('payment', paymentOptions);
  paymentElement.value.mount('#payment-element-modal');
  // // Create and mount the linkAuthentication Element to enable autofilling customer payment details
  // const linkAuthenticationElement = elements.value.create("linkAuthentication");
  // linkAuthenticationElement.mount("#link-authentication-element-modal");
}

const submitSubscribe3 = async () => {
  if (!elements.value) {
    return false
  }
  if (!stripe.value) {
    return false
  }

  // Modal非表示
  modalAddPaymentMethod.value.close()

  // submit()
  elements.value.submit();

  // Confirm the payment given the clientSecret
  // from the payment intent that was just created on
  // the server.
  const { error: stripeError } = await stripe.value.confirmSetup({
    elements: elements.value,
    clientSecret: clientSecret.value,
    confirmParams: {
      return_url: `${window.location.origin}/samples/payment`,
    }
  });

  if (stripeError) {
    _setMessage(stripeError.message as string);
    return;
  }
}

// デフォルト支払い方法を変更する
const changeDefaultPaymentMethod = async (paymentMethodId: string) => {
  const res = await stripeStore.updateCustomer(targetCustomer.value.id, {
    invoice_settings: {
      default_payment_method: paymentMethodId
    }
  })
  defaultPaymentMethodId.value = res.invoice_settings.default_payment_method
}

// サブスクリプションのキャンセル
const cancelSubscription = async () => {
  // Subscription キャンセルを実行
  await stripeStore.cancelSubscription(targetSubscription.value.id)
  // 画面遷移
  stepName.value = 'canceled'
}

const _setMessage = (message: string) => {
  messages.value = []
  messages.value.push(message)
}
</script>

<template>
  <div class="container mx-auto w-screen bg-inherit">
    <h1 class="mt-3 ps-3 py-3 text-3xl bg-slate-50 font-bold">bc-meeting 決済</h1>

    <div class="border p-3 mb-3" v-if="stepName === 'create1'">
      <h2 class="mb-3 text-xl font-bold">サブスクリプション</h2>

      <div class="">
        <div class="">
          <label class="">氏名</label>
          <span class="p-2 m-2 text-xl">{{ name }}</span>
        </div>
        <div class="">
          <label class="">メールアドレス</label>
          <span class="p-2 m-2 text-xl">{{ email }}</span>
        </div>

        <div class="">
          <label class="">商品:</label>
          <div class="p-3 m-3 border w-64 h-32" v-for="(item) in prices" :key="item.id">
            <div class="font-bold">{{ item.product.name }}</div>
            <div class="font-bold">
              {{ item.unit_amount }}
              {{ item.currency === 'jpy' ? '円' : item.currency }}
              / {{ item.recurring.interval === 'month' ? '月' : item.recurring.interval === 'year' ? '年' : item.recurring.interval }}
            </div>
            <form @submit.prevent="submitSubscribe1(item.id)">
              <ButtonGeneralPrimary type="submit">
                選択
              </ButtonGeneralPrimary>
            </form>
          </div>
        </div>

        <div id="messages">
          <div v-for="(item, index) in messages" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="border p-3 my-3" v-else-if="stepName === 'create2'">
      <h2 class="mb-3 text-xl font-bold">サブスクリプション</h2>

      <div class="">
        <form id="subscribe-form" @submit.prevent="submitSubscribe2">
          <div class="p-3 my-3 border">
            <label class="">商品:</label>
            <div class="">
              <!-- <div class="">id: <span class="font-bold">{{ priceSelected.id }}</span></div> -->
              <div class="">product name: <span class="font-bold">{{ targetPrice.product.name }}</span></div>
              <div class="">product price:
                <span class="font-bold">
                  {{ targetPrice.unit_amount }}
                  {{ targetPrice.currency === 'jpy' ? '円' : targetPrice.currency }}
                  / {{ targetPrice.recurring.interval === 'month' ? '月' : targetPrice.recurring.interval === 'year' ? '年' : targetPrice.recurring.interval }}
                </span>
              </div>
            </div>
          </div>

          <!-- <div id="link-authentication-element"> -->
          <!-- Elements will create authentication element here -->
          <!-- </div> -->
          <div id="payment-element" style="max-width: 500px;">
            <!-- Elements will create form elements here -->
          </div>

          <ButtonGeneralPrimary class="my-3" type="submit" :disabled="isLoading">
            申し込み実行
          </ButtonGeneralPrimary>

          <div id="messages">
            <div v-for="(item, index) in messages" :key="index">
              {{ item }}
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="border p-3 my-3" v-else-if="stepName === 'available'">
      <h2 class="mb-3 text-xl font-bold">サブスクリプション</h2>

      <div class="">
        <div class="my-3">
          <div class="">サブスクリプションID: {{ targetSubscription.id }}</div>
          <div class="">サービス名: {{ targetPrice.product.name }}</div>
          <div class="">サービス開始日時: {{ dayjs(targetSubscription.start_date * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          <div class="" v-if="targetSubscription.ended_at">サービス終了日時: {{ dayjs(targetSubscription.ended_at * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          <div class="" v-if="targetSubscription.cancel_at">サービスキャンセル日時: {{ dayjs(targetSubscription.cancel_at * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          <div class="">現在の期間: {{ dayjs(targetSubscription.current_period_start * 1000).format('YYYY-MM-DD HH:mm') }} 〜 {{ dayjs(targetSubscription.current_period_end * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          <div class="">状態: {{ targetSubscription.status }}</div>
        </div>

        <div class="my-3" v-if="targetSubscription.status !== 'canceled' && !targetSubscription.cancel_at_period_end">
          <ButtonGeneralPrimary @click="cancelSubscription">
            サブスクリプションをキャンセル
          </ButtonGeneralPrimary>
        </div>

        <div class="my-3">
          <h2 class="mb-3 font-bold">請求書</h2>

          <table class="border">
            <thead>
              <tr>
                <th class="p-2 border">作成日</th>
                <th class="p-2 border">金額</th>
                <th class="p-2 border">支払い状態</th>
                <th class="p-2 border">請求書番号</th>
                <th class="p-2 border">請求書</th>
              </tr>
            </thead>
            <tbody>
              <tr class="" v-for="item in targetInvoices.invoices" :key="item.id">
                <td class="p-2 border">{{ dayjs(item.created * 1000).format('YYYY-MM-DD') }}</td>
                <td class="p-2 border">{{ item.amount_due }} {{ item.currency === 'jpy' ? '円' : item.currency }}</td>
                <td class="p-2 border">{{ item.paid ? '支払い済み' : '未払い' }}</td>
                <td class="p-2 border">{{ item.number }}</td>
                <td class="p-2 border">
                  <a :href="item.hosted_invoice_url" class="underline text-blue-500" target="_blank">URL</a>
                  / <a :href="item.invoice_pdf" class="underline text-blue-500" target="_blank">ダウンロード</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="">
          <h2 class="mb-3 font-bold">支払い方法</h2>

          <div class="p-3 border" v-for="(item) in (targetPaymentMethods as any).paymentMethods" :key="item.id">
            <div>type: <span class="font-bold">{{ item.type }}</span> / id: <span class="font-bold">{{ item.id }}</span></div>
            <div class="">
              <InputRadio :id="item.id" :value="item.id" v-model="defaultPaymentMethodId" @click.prevent="changeDefaultPaymentMethod(item.id)">{{ item.id }}</InputRadio>
            </div>
            <div v-if="item.type === 'card'">
              <div>Card Number: <span class="text-2xl font-bold">... {{ item.card.last4 }}</span></div>
              <div>expiration: <span class="font-bold">{{ item.card.exp_year }} / {{ item.card.exp_month }}</span></div>
              <div>brand: <span class="font-bold">{{ item.card.brand }}</span></div>
            </div>
          </div>

          <ButtonGeneralPrimary class="" @click="openModalForAddingPaymentMethod">
            支払い方法を追加
          </ButtonGeneralPrimary>
        </div>
      </div>
    </div>

    <div class="border p-3 my-3" v-else-if="stepName === 'canceled'">
      <h2 class="mb-3 text-xl font-bold">サブスクリプション</h2>

      <div class="">
        キャンセルしました。
      </div>
    </div>

    <ModalGeneral
      ref="modalAddPaymentMethod"
      :is-close-modal-back="false"
      :class-bg="'bg-slate-700 opacity-90'"
      :class-fg="'bg-white text-black'"
      :style-bg="''"
      :style-fg="''"
    >
      <div class="">
        <form id="subscribe-form3" @submit.prevent="submitSubscribe3">
          <div class="h-54 w-96 p-3">
            <div class="">modalAddPaymentMethod</div>
            <div class="">
              <!-- <div id="link-authentication-element-modal"> -->
              <!-- Elements will create authentication element here -->
              <!-- </div> -->
              <div id="payment-element-modal" style="">
                <!-- Elements will create form elements here -->
              </div>

              <div class="mb-3 text-center">
                <ButtonGeneralPrimary class="my-3 me-2" type="submit" :disabled="isLoading">
                  クレジットカード追加
                </ButtonGeneralPrimary>
                <ButtonGeneralSecondary class="cursor-pointer" @click="modalAddPaymentMethod.close()">
                  キャンセル
                </ButtonGeneralSecondary>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ModalGeneral>
  </div>
</template>

<style lang="scss" scoped>
</style>
