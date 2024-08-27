<script setup lang="ts">
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CKBox,
  CloudServices,
  CodeBlock,
  Essentials,
  FindAndReplace,
  GeneralHtmlSupport,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  Paragraph,
  PictureEditing,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5'
import translations from 'ckeditor5/translations/ja.js'
import 'ckeditor5/ckeditor5.css'

const editor = ClassicEditor
const editorData = '<p>Hello from CKEditor 5 in Vue!</p>'
const editorConfig = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'findAndReplace',
      'selectAll',
      '|',
      'heading',
      '|',
      'link',
      'blockQuote',
      'insertImage',
      'insertTable',
      'codeBlock',
      '|',
      'alignment',
      '|',
      'bulletedList',
      'numberedList',
      'todoList'
    ],
    shouldNotGroupWhenFull: false
  },
  plugins: [
    AccessibilityHelp,
    Alignment,
    AutoImage,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    Bold,
    CKBox,
    CloudServices,
    CodeBlock,
    Essentials,
    FindAndReplace,
    GeneralHtmlSupport,
    Heading,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link,
    LinkImage,
    List,
    Paragraph,
    PictureEditing,
    SelectAll,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TodoList,
    Underline,
    Undo
  ],
  balloonToolbar: [
    'bold',
    'italic',
    '|',
    'link',
    'insertImage',
    '|',
    'bulletedList',
    'numberedList'
  ],
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph'
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1'
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2'
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3'
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4'
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5'
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6'
      }
    ]
  },
  image: {
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage'
    ]
  },
  language: 'ja',
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file'
        }
      }
    }
  },
  placeholder: 'Type or paste your content here!',
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties'
    ]
  },
  translations: [translations],
  htmlSupport: {
    allow: [
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true
      }
    ]
  }
}
</script>

<template>
  <div>
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
  </div>
</template>
