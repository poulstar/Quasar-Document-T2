# ساخت component صفحه اصلی داشبورد و اجرا prototype آن

###### برای ساختن محتوا های دخل صفحه index داشبورد، ابتدا یک فایل  ts داخل پوشه component می سازیم و اسم آن را IndexComponent می گذاریم. قطعه کد زیر را جهت داشتن چهار  پست جعلی یا پیشفرض می سازیم و بعد در آینده آن را تغییر می دهیم.


```bash
import { ref } from 'vue';

const posts = ref([
  {
    id: 0,
    image: 'images/mountains.jpg',
    title: 'Fake Post',
    username: 'hossein',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
    upVoteCount: 10,
  },
  {
    id: 0,
    image: 'images/mountains.jpg',
    title: 'Fake Post',
    username: 'hossein',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
    upVoteCount: 10,
  },
  {
    id: 0,
    image: 'images/mountains.jpg',
    title: 'Fake Post',
    username: 'hossein',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
    upVoteCount: 10,
  },
  {
    id: 0,
    image: 'images/mountains.jpg',
    title: 'Fake Post',
    username: 'hossein',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
    upVoteCount: 10,
  },
]);

export {posts}
```
###### می رویم سراغ فایل  IndexPage تا صفحه خود را بسازیم. ابتدا به سراغ script می رویم. در اسکریپت  lang را برابر با ts قرار می دهیم تا تایپ اسکریپت را پوشش دهد.

###### در داخل آن component را اضافه می کنیم و یک تابع جهت like می سازیم که موقت است و فعلا شناسه را چاپ می کند.

```bash
import { posts } from 'components/ts/IndexComponent';

const like = (id:number) => {
  console.log(id);
}
```

###### در بخش template چون صفحه ما از dashboard layout ارث می برد، صفحه overflow برابر با hidden دارد. به همین دلیل برای اینکه بتوانیم محتوا بیشتر را نشان دهیم، به q-layout خود class مورد نیاز یعنی overflow-auto window-height را می دهیم.

```bash
class="overflow-auto window-height"
```
###### برای نمایش پست های خود یک div باز می کنیم و class های مور نیاز خود را می دهیم و در داخل آن  از یک q-card استفاده می کنیم که نمونه های مختلف آن را می توانید در <a href="https://quasar.dev/vue-components/card/">Quasar Card</a> مشاهده کنید. برای آنکه q-card ما به تعداد مناسب تکثیر شود، بر روی آن یک حلقه v-for می گذاریم و در جا های مناسب داده های مورد نظر خود را نمایش می دهیم.

```bash
<div class="q-pa-md q-mb-xl row items-start q-gutter-sm justify-center">
  <q-card class="my-card" v-for="(post, index) in posts" :key="index">
    <q-img :src="post.image" width="100%" height="300px" />
    <q-card-section>
      <q-btn
        fab
        color="light-blue-8"
        icon="place"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ post.title }}
        </div>
        <div
          class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
        ></div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        {{ post.username }}
      </div>
      <div class="text-caption text-grey">
        {{ post.description.substring(0, 200) }} ...
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-btn
        color="light-blue-8"
        icon-right="favorite"
        :label="`Like (${post.upVoteCount})`"
        @click="like(post.id)"
      />
    </q-card-actions>
  </q-card>
</div>
```

###### برای اینکه q-card ما یک اندازه دلخواه را داشته باشد. یک کلاس my-card به آن دادیم و آن را در app.scss به صورت زیر تعریف کردیم.

```bash
.my-card {
  max-width: 300px;
  width: 100%;
}
```


