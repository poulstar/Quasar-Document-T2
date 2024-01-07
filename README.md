# آموزش ساخت Dashboard Layout و Composable Component و ساختار اولیه صفحات داشبورد

###### در این بخش ما قصد داریم صفحه داشبورد را آماده سازی کنیم به همین دلیل به سراغ DashboardLayout می رویم تا نیاز های خود را بر روی آن اعمال کنیم. دو منو سمت چپ و راست دارد که باید به آن رسیدگی کنیم. به همین دلیل دو composable می سازیم تا از آن ها استفاده کنیم.

###### در پوشه components پوشه ای می سازیم به نام ts و در داخل فایلی می سازیم به اسم MenuComponent و قطعه کد زیر را در داخل آن می نویسیم.

```bash
import{ mdiSearchWeb ,mdiHome, mdiNote, mdiNoteMultiple, mdiAccountGroup} from '@quasar/extras/mdi-v7';

type menuItem = {name: string, route: string, icon: string};

function menu() {
  return [
    { name: 'Search', route: 'search', icon: mdiSearchWeb },
    { name: 'Dashboard', route: 'index', icon: mdiHome },
    { name: 'My Post', route: 'myPost', icon: mdiNote },
    { name: 'All Post', route: 'allPost', icon: mdiNoteMultiple },
    { name: 'All User', route: 'allUser', icon: mdiAccountGroup },
  ] as menuItem[];
}

export const accessMenu = menu();
```

###### از کتاب خانه mdi یک سری icon بر می داریم تا با آن نماد های لیست خود را بسازیم. یک تایپ object هم می سازیم که برای منو خود از آن استفاده کنیم. تابع منو را می سازیم که در اضائه صدا زدن، یک منو برای ما ساخته شود. وقتی منو را صدا کنیم، یک لیست از object ها برای ما ارسال می شود که نامی که می خواهیم نمایش دهیم و نام مسیر و icon آن مشخص شده است و تایپ این لیست هم برابر با menuItem قرار می دهیم. سر انجام حاصل را از طریق متغیری به نام accessMenu بر می گردانیم.

###### برای منو سمت راست فایلی تحت عنوان ProfileComponent را می سازیم و قطعه کد زیر را در داخل آن می نویسیم.

```bash
import { ref } from 'vue';

const profileTemp = ref({
  modal: false,
  id: 0,
  username: 'hossein pourghadiri',
  email: 'hossein@gmail.com',
  avatar: '../../../public/images/avatar.png',
  newAvatar: undefined,
  password: '',
  role: 'user',
});

export {profileTemp}
```
###### به شکل موقت یک object از نوع ref می سازیم و محتوا مورد نظر خود را در نظر می گیریم و آن را تحت عنوان profileTemp برای فراخوانی، export می کنیم.

###### می خواهیم مسیر های جدید خود را بسازیم، به همین دلیل نیاز به فایل های جدید داریم. در پوشه pages و در آن، در پوشه dashboard فایل های زیر را می سازیم. در داخل آن ها به صورت موقت فقط یک تگ template می گذاریم.

###### SearchPage.vue
###### MyPostPage.vue
###### AllPostPage.vue
###### AllUserPage.vue
###### در همه آن ها قطعه کد زیر را می گذاریم.

```bash
<template>
  <div>

  </div>
</template>
```

###### به سراغ فایل routes می رویم تا مسیر های جدید را بسازیم. هر یک از این مسیر ها را به عنوان فرزندان dashboard در نظر می گیریم.

###### برای index
```bash
{
  path: 'index',
  name: 'index',
  component: () => import('pages/dashboard/IndexPage.vue')
}
```

###### برای search
```bash
{
  path: 'search',
  name: 'search',
  component: () => import('pages/dashboard/SearchPage.vue')
}
```

###### برای myPost
```bash
{
  path: 'myPost',
  name: 'myPost',
  component: () => import('pages/dashboard/MyPostPage.vue')
}
```

###### برای allPost
```bash
{
  path: 'allPost',
  name: 'allPost',
  component: () => import('pages/dashboard/AllPostPage.vue')
}
```

###### برای allUser
```bash
{
  path: 'allUser',
  name: 'allUser',
  component: () => import('pages/dashboard/AllUserPage.vue')
}
```
###### وارد صفحه DashboardLayout می شویم و در بخش script آن accessMenu و profileTemp را که ساخته بودیم را import می کنیم. در بخش return دو متغیر accessMenu و profileTemp را با بخش template می فرستیم. دو تابع نیاز داریم برای بحث ویرایش پروفایل . خروج از سیستم.

###### در تابع update فعلا یک کلمه update را چاپ می کنیم و در اضائه فراخوانی تابع مقدار modal را معکوس می کنیم.

```bash
update(){
  console.log(
    'update'
  );
  profileTemp.value.modal = !profileTemp.value.modal
},
```
###### در تابع logout هم فعلا همین طور، فقط یک کلمه logout را چاپ می کنیم.

```bash
logout(){
  console.log('logout');
}
```
###### در بخش template، برای بخش header، عکس لوگو را عوض می کنیم به لوگویی که خودمان انتخاب کردیم و کلمه Menu را با عنوان سایت عوض می کنیم. قبل دکمه سمت راست یک span می سازم و عنوان Profile را داخل آن می نویسیم. برای q-layout هم کلاس auth-background را در نظر می گیریم.

```bash
<q-header elevated class="bg-primary text-white">
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

    <q-toolbar-title>
      <q-avatar>
        <img src="../../../public/images/logo.png">
      </q-avatar>
      Menu
    </q-toolbar-title>
    <span>Profile</span>
    <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
  </q-toolbar>
</q-header>
```
###### برای q-drawer سمت چپ می خواهیم لیست منو را فعال کنیم. از q-list استفاده می کنیم و q-item ها را داخل یک حلقه می گذاریم که کلید آن را بر اساس index می گذاریم و برای redirect شدن از to استفاده می کنیم. در داخل q-item هم آواتار و label را نشان می دهم.

```bash
<q-list separator>
  <q-item
    v-for="(item, index) in accessMenu"
    :key="index"
    :to="{ name: item.route }"
    v-ripple
    clickable
  >
    <q-avatar><q-icon :name="item.icon"></q-icon></q-avatar>
    <q-item-section>
      <q-item-label class="q-ml-sm"> {{ item.name }} </q-item-label>
    </q-item-section>
  </q-item>
</q-list>
```
###### در بخش q-drawer سمت راست برای بخش بالا یک avatar box می سازیم و با کلاس دادن شکل آن را مطابق سلیقه خود شکل می دهیم و در داخل آن عکس کاربر را نمایش می دهیم.

###### برای کلاس avatarBox قطعه کد را در app.scss به صورت زیر می نویسیم.
```bash
.avatarBox {
  background-image: radial-gradient(
    rgb(245, 246, 240),
    rgb(2, 136, 209),
    rgb(5, 77, 139)
  );
  width: 100%;
  height: 300px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.9);
}
```
###### تگ را هم به صورت زیر می نویسیم
```bash
<div class="avatarBox row items-center justify-center">
  <q-avatar size="150px" class="overlapping">
    <q-img :src="profileTemp.avatar"></q-img>
  </q-avatar>
</div>
```

###### برای بخش نمایش اطلاعات اولیه از کاربر تگ زیر را می نویسیم.

```bash
<div class="q-pa-md row items-start q-gutter-md justify-center">
  <q-card flat bordered class="my-card text-center">
    <q-card-section>
      <div class="text-h3">Profile</div>
    </q-card-section>
    <q-separator inset />

    <q-card-section class="q-pt-none">
      <div class="text-h6">User Name</div>
      {{ profileTemp.username }}
    </q-card-section>

    <q-separator inset />

    <q-card-section class="q-pt-none">
      <div class="text-h6">E-Mail</div>
      {{ profileTemp.email }}
    </q-card-section>
  </q-card>
</div>
```
###### برای بخش سوم کار هم دو دکمه می سازیم و که یکی برای ویرایش و دیگری برای خروج از سیستم است. برای بخش update هم از الگو dialog box استفاده می کنیم که به آن modal هم می گویند. قطعه کد آن را به صورت زیر می نویسیم.

```bash
<div class="q-pa-md q-gutter-sm text-center">
  <q-btn
    class="full-width"
    label="Update"
    color="light-blue-8"
    @click="profileTemp.modal = true"
  />
  <q-btn class="full-width" label="Logout" color="red" @click="logout()" />

  <q-dialog v-model="profileTemp.modal" persistent>
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h6">Update Profile</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="profileTemp.username"
          label="Your User Name"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="profileTemp.email"
          label="Your E-Mail"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="profileTemp.password"
          dense
          label="Your Password"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file
          filled
          bottom-slots
          v-model="profileTemp.newAvatar"
          label="Label"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="profileTemp.newAvatar = null"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:hint> File Size </template>
        </q-file>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Submit" @click="update()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
```




