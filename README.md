# ساخت صفحات Login و Register در پروژه

###### حال با دانشی که یاد گرفته ایم مرحله به مرحله شروع به توسعه نرم افزار خود می کنیم. دقت کنید که روند کار ما بدین صورت است که ابتدا ساختار را جهت نمونه می سازیم و سپس عملکرد واقعی را روی آن پیاده سازی می کنیم. برای شروع کار بر روی <a href="https://codeload.github.com/poulstar/Quasar-Images-File/zip/refs/heads/main">لینک</a> کلیک کنید و فایل مورد نظر را دانلود کنید و محتوا آن را در داخل پوشه public پروژه بگذارید.

###### در داخل پوشه layouts برای بحث login و register یک پوشه می سازیم به اسم auth، بعد آن فایل AuthLayout.vue را می سازیم و کد زیر را در داخل آن می نویسیم.

```bash
<template>
  <q-layout class="auth-background">
    <router-view/>
  </q-layout>
</template>
```
###### برای اینکه ظاهر layout را درست کنیم به آن کلاس auth-background می دهیم و می رویم داخل پوشه css در فایل app.scss، کلاس مورد نظر خود را به صورت زیر تعریف می کنیم.

```bash
.auth-background {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(../../public/images/loginWallpaper.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
```
###### در پوشه pages برای بحث login و register پوشه auth را می سازیم و در آن دو فایل LoginPage.vue و RegisterPage.vue را می سازیم.

###### در فایل routes برای مسیر های مورد نظر قطعه کد زیر را می نویسیم.

```bash
path: '/',
component: () => import('layouts/auth/AuthLayout.vue'),
redirect: <RouteRecordRedirectOption> route( <RouteCallback> {name: 'login'} ),
children: [
  {
    path: 'login',
    name: 'login',
    component: () => import('pages/auth/LoginPage.vue')
  },
  {
    path: 'register',
    name: 'register',
    component: () => import('pages/auth/RegisterPage.vue')
  },
],
```
###### برای قطعه کد فوق شما باید import های مورد نظر را انجام دهید.
```bash
import { route } from 'quasar/wrappers';
import { RouteCallback } from '@quasar/app-vite';
import { RouteRecordRaw, RouteRecordRedirectOption } from 'vue-router';
```
###### ما برای کد خود از کتاب خانه vue-router به RouteRecordRedirectOption نیاز داریم و از کتاب خانه @quasar/app-vit نیاز به RouteCallback داریم و برای دسترسی به route ها نیاز داریم کتاب خانه quasar/wrappers را صدا بزنیم.

###### کلید redirect را تعریف کردیم تا اگر درخواست برای url اولیه یا اصطلاحا root کردیم ما را منتقل کند به آدرس login تا سایت شروع به کار کند.

###### برای صفحه login از کد زیر استفاده می کنیم.

```bash
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const loginParameters = ref({
  username: '',
  password: '',
});
const login = () => {
  console.log(loginParameters.value.username, loginParameters.value.password);
};

const router = useRouter();
const register = () => {
  router.replace({ name: 'register' });
};
</script>
```
###### در بخش script ما setup را به تگ اضافه می کنیم تا کل محیط setup باشد. از کتاب خانه vue ما ref را import می کنیم و از کتاب خانه vue-router ما useRouter را import می کنیم.

###### در ابتدا یک متغیر برای پارامتر های login می سازیم از نوع ref که رفرنسی باشند به آن متغیر و دو کلید که یکی username  و  دیگری password باشد را تعریف می کنیم. تابع login را به صورت موقت می سازیم تا فقط مقادیر را چاپ کند.

###### تابع useRouter را اجرا می کنیم و آن را داخل متغیر router ذخیره می کنیم تا به وسیله آن بتوانیم به آدرس URL جدید منتقل شویم. این کار را با اشاره به نامی انجام می دهیم که به صفحه register منتج می شود.

```bash
<template>
  <q-page-container>
    <q-page class="window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <h5 class="text-h5 text-white q-my-md">Welcome To Open World</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg w-400">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  v-model="loginParameters.username"
                  square
                  filled
                  clearable
                  type="email"
                  label="Email"
                />
                <q-input
                  v-model="loginParameters.password"
                  square
                  filled
                  clearable
                  type="password"
                  label="Password"
                />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                @click="login()"
                unelevated
                color="light-blue-8"
                size="lg"
                class="full-width"
                label="login"
              />
              <q-btn
                @click="register()"
                unelevated
                color="red"
                size="lg"
                class="full-width q-ma-sm"
                label="Register"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none"> </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>
```
###### برای بخش ظاهر یک تگ template باز می کنیم و یک q-page-container را استفاده می می کنیم تا بتوانیم از تگ q-page استفاده کنیم. به آن کلاس های bootstrap لحاظ کردیم تا باکس ما را در وسط صفحه در نظر بگیرد. در داخل آن بر روی div کلاس column دادیم تا به صورت ستونی روی هم قرار بگیرد. در مرحله بعدی در دو div که به آن کلاس row دادیم برای بخش عنوان و برای بخش فرم دو فضای مجزا ساختیم. در بخش فرم خود روی تگ q-page از یک کلاس w-400 استفاده کردیم که این کلاس را به صورت زیر در app.scss نوشتیم.

```bash
.w-400 {
  width: 400px;
}
```
###### برای اینکه داده های داخل input ها را ذخیره نگه داریم، به آن ها v-model دادیم تا بتوانیم اتصال آن ها با متغیر داخل script را برقرار کنیم. و رو دو دکمه login و register، تابع هایی که نوشته بودیم را از طریق @click متصل کردیم تا در صورت کلیک شده تابع مورد نظر را اجرا کند.

###### در گام بعدی همین کار را برای صفحه RegisterPage.vue انجام می دهیم. اول بخش script آن را می نویسیم.

```bash
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const registerParameters = ref({
  name: '',
  email: '',
  password: '',
  avatar: [],
});
const register = () => {
  console.log(
    registerParameters.value.name,
    registerParameters.value.email,
    registerParameters.value.password,
    registerParameters.value.avatar
  );
};

const router = useRouter();
const login = () => {
  router.replace({ name: 'login' });
};
</script>
```
###### بخش template آن را نیز همان گونه توسعه می دهیم با این تفاوت که تعداد input های آن را بیشتر می کنیم.

```bash
<template>
  <q-page-container>
    <q-page class="window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <h5 class="text-h5 text-white q-my-md">Register To Open World</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg w-400">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  v-model="registerParameters.name"
                  square
                  filled
                  clearable
                  type="text"
                  label="First Name and Last Name"
                />
                <q-input
                  v-model="registerParameters.email"
                  square
                  filled
                  clearable
                  type="email"
                  label="Email"
                />
                <q-input
                  v-model="registerParameters.password"
                  square
                  filled
                  clearable
                  type="password"
                  label="Password"
                />
                <q-file
                  v-model="registerParameters.avatar"
                  ref="avatarState"
                  filled
                  bottom-slots
                  label="Avatar"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop.prevent />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop.prevent="registerParameters.avatar = null"
                      class="cursor-pointer"
                    />
                  </template>

                  <template v-slot:hint> File Size </template>
                </q-file>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                @click="register()"
                unelevated
                color="light-blue-8"
                size="lg"
                class="full-width q-ma-sm"
                label="Register"
              />
              <q-btn
                @click="login()"
                unelevated
                color="red"
                size="lg"
                class="full-width"
                label="login"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none"> </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>
```

