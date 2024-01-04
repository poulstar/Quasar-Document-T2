# آموزش کار با Quasar Layout Builder و نحوه اجرا آن در پروژه

## برای اینکه یک layout بسازیم به صفحه <a href="https://quasar.dev/layout-builder/">quasar layout builder</a> می رویم و از امکاناتی که می خواهیم، فعال می کنیم. قطعه کدی که خروجی می دهد را بر می داریم تا از آن استفاده کنیم.


###### برای شروع یک پوشه dashboard داخل layouts می سازیم و فایل DashboardLayout.vue را داخل آن می سازیم و کدی که کپی کرده بودیم را داخل آن قرار می دهیم.

```bash
<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>
```


###### سپس داخل پوشه pages نیز یک پوشه dashboard می سازیم و در آن یک فایل IndexPage.vue ایجاد می کنیم. یادتان باشد که اگر صفحه ساخته شده را بدون چارچوب اولیه بسازید با خطا رو به رو می شوید.

```bash
<template>
  <q-layout>

  </q-layout>
</template>

<script setup>

</script>
```


###### در پوشه router فایل routes.ts می رویم و آدرس مورد نظر جهت دسترسی به صفحه مورد نظر خود را می سازیم.

```bash
{
  path: '/dashboard',
  component: () => import('layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      path: 'index',
      component: () => import('pages/dashboard/IndexPage.vue')
    },
  ],
},
```

###### دستور اجرا را بزنید تا کار خود را مشاهده کنید.

```bash
quasar dev
```

###### سایت quasar نمونه layout های دیگری نیز دارد که اگر بخواهید می توانید از آن ها هم استفاده کنید. برای مشاهده آن می توانید روی کلمه <a href="https://quasar.dev/layout/gallery/">لینک</a> کلیک کنید.


