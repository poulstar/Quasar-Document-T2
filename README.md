# اجرا و پیاده سازی Ajax Bar و Dynamic CSS و Dark Mode

###### برای این مرحله نیاز است کمی تنظیمات quasar را یاد بگیریم. برای اینکه بخواهیم <a href="https://quasar.dev/quasar-plugins/loading-bar">Ajax Bar</a> را فعال کنیم باید در داخل quasar.config.js بخشی که نوشته framework را پیدا کنیم. در آن دو key وجود دارد که یکی config و دیگری plugins است. در config قطعه کد زیر را می نویسیم.

```bash
loadingBar: {
  position: 'top',
  reverse: false,
  color:'white',
  size:'5px'
},
```
###### و در plugins نیز آن را به صورت زیر فعال می کنیم.
```bash
'LoadingBar',
```

###### حال اگر quasar dev را بزنید، برای هر درخواستی که سمت سرور می رود و باز می گردد، یک نوار سفید در بالای  صفحه خواهید دید که پر می شود. اگر قصد دارید تنظیمات آن را عوض کنید می توانید config آن را تغییر دهید.

###### برای اینکه از قابلیت <a href="https://quasar.dev/quasar-plugins/dark">dark mode و light mode</a> استفاده کنید باید به چند نکته توجه کنید. اول اینکه می توان به صورت پیشفرض تعیین کرد که شروع اجرا نرم افزار ما در کدام mode  باشد و آن نیز از طریق افزودن مقدار زیر به config موجود در framework فایل quasar.config.js امکان پذیر  می شود.

```bash
dark: false,
```
###### در حالت فعلی ما تعیین کردیم که شروع نرم افزار روی حالت light mode باشد. اما اگر بخواهیم امکان انتخاب و تغییر توسط کاربر را فراهم کنیم، باید در DashboardLayout امکاناتی را فراهم آوریم. از همین رو در بخش script اول useQuasar را از کتاب خانه quasar برای خود import می کنیم.

```bash
import { useQuasar } from 'quasar';
```

###### در setup قبل از return دو متغیر را می سازیم و به صورت زیر آن را می نویسیم تا از آن ها استفاده کنیم.

```bash
const $q = useQuasar();
const darkMode = ref(false);
```
###### متغیر q برای این است که وقتی می خواهیم به quasar دستور دهیم حالت سیستم را عوض کن ساختیم و متغیر darkMode را برای toggle ساختیم که در template بتوانیم ما بین این دو وضعیت نمایشی داشته باشیم. چون متغیر darkMode را نیاز داریم، در return هم آن را می نویسیم.

```bash
darkMode,
```
###### برای اینکه امکان تغییر وضعیت از light mode به dark mode  و بر عکس فراهم باشد، تابعی به صورت زیر برای آن در return می نویسیم.

```bash
themeMode() {
  if ($q.dark.mode == false) {
    $q.dark.set(true);
  } else {
    $q.dark.set(false);
  }
},
```

###### وقتی تابع صدا زده می شود، بررسی می شود که در کدام حالت هستیم و آن را به حالت خلاف خود در می آورد.

###### در template هم در بخش تگ header قبل تگ span قطعه کد زیر را اضافه می کنیم.

```bash
<q-toggle v-model="darkMode" color="black" @click="themeMode" />
```

###### حال برای آنکه مثال ساده ای از Dynamic CSS داشته باشیم، می خواهیم فقط در DashboardLayout نوار header را به چند حالت انیمیشنی css در آوریم که رنگ هایی را به background می دهد. ابتدا در انتهای صفحه DashboardLayout قطعه کد css را اضافه می کنیم تا از آن استفاده کنیم.

```bash
<style>
.header {
  animation: v-bind(navBarClass) 5s alternate infinite linear;
}
.RGB {
  animation: RGB 5s alternate infinite linear;
}
@keyframes RGB {
  0% {
    background-color: red;
  }
  50% {
    background-color: green;
  }
  100% {
    background-color: blue;
  }
}
.Primary {
  animation: Primary 5s alternate infinite linear;
}
@keyframes Primary {
  0% {
    background-color: #caf0f8;
  }
  12% {
    background-color: #ade8f4;
  }
  24% {
    background-color: #90e0ef;
  }
  36% {
    background-color: #48cae4;
  }
  48% {
    background-color: #00b4d8;
  }
  60% {
    background-color: #0096c7;
  }
  72% {
    background-color: #0077b6;
  }
  84% {
    background-color: #023e8a;
  }
  100% {
    background-color: #03045e;
  }
}

.Dark {
  animation: Dark 5s alternate infinite linear;
}
@keyframes Dark {
  0% {
    background-color: #f8f9fa;
  }
  12% {
    background-color: #e9ecef;
  }
  24% {
    background-color: #dee2e6;
  }
  36% {
    background-color: #ced4da;
  }
  48% {
    background-color: #adb5bd;
  }
  60% {
    background-color: #6c757d;
  }
  72% {
    background-color: #495057;
  }
  84% {
    background-color: #343a40;
  }
  100% {
    background-color: #212529;
  }
}
</style>
```

###### بر روی animation کلاس header یک v-bind(navBarClass) گذاشتیم که اگر آن متغیر تغییر کند، کلاس بر روی تگ q-header نیز تغییر می کند. حال در template هم مقدار class را به صورت زیر در می آوریم.

```bash
<q-header elevated :class="'text-white header'">
```
###### بعد آن در header قبل q-toggle که نوشته بودیم تگ q-select را به صورت زیر می نویسیم.

```bash
<q-select
  v-model="navBarSelect"
  :options="navBarOptions"
  :hide-dropdown-icon="true"
  :hide-selected="true"
>
  <template v-slot:append>
    <q-avatar>
      <span class="material-icons">palette</span>
    </q-avatar>
  </template>
</q-select>
```
###### حال می رویم به script برای متغیر هایی مانند navBarSelect و navBarOptions کد نویسی کنیم. دقت کنید چون لازم است به محض تغییر انتخاب ما نوع css تغییر کند، باز نیاز داریم از watch استفاده کنیم، پس از کتاب خانه vue آن را هم import می کنیم.

```bash
import { ref, watch } from 'vue';
```
###### در بخش setup، قبل از اینکه return صورت بگیرد، قطعه کد زیر را می نویسیم.

```bash
const navBarSelect = ref('');
const navBarOptions = ['Default', 'RGB', 'Primary', 'Dark'];
const navBarClass = ref('');
watch(navBarSelect, () => {
  if (navBarSelect.value === 'RGB') {
    navBarClass.value = 'RGB';
  } else if (navBarSelect.value === 'Primary') {
    navBarClass.value = 'Primary';
  } else if (navBarSelect.value === 'Dark') {
    navBarClass.value = 'Dark';
  } else {
    navBarClass.value = 'Default';
  }
});
```
###### متغیر navBarSelect برای این است که ما انتخاب کاربر را دریافت کنیم و متناسب با آن نمایش header را عوض کنیم. متغیر navBarOptions متغیری است که حالت هایی را که کاربر می تواند انتخاب کند را مشخص کرده ایم. navBarClass هم متغیری است که متناسب با آن در animation نام keyframes را عوض می کنیم که در کد های فوق آن را v-bind(navBarClass) کرده بودیم. یک watch بر روی navBarSelect می گذاریم که اگر تغییر کرد، بلافاصله نوع انیمشین هم عوض شود. حال برای اینکه قطعه کد ما اجرا شود، لازم است سه متغیر فوق را به صورت زیر در return تعریف کنیم که بیرون script قابل دسترسی باشد.

```bash
navBarClass,
navBarSelect,
navBarOptions,
```




