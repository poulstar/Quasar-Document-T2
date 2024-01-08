# آموزش کار با تکنولوژی pinia و کامل کردن فرآیند Login مبتنی بر تکنولوژی Oauth

###### چون قرار است در این بخش ما یک درخواست API بزنیم و ارتباط با بیرون شکل بگیرد. ابتدا به فایل axios.ts می رویم و <a href="https://openapi.poulstar.org/">آدرس سایت</a> خود را وارد می کنیم تا همه درخواست های ما به سوی آن سرور ارسال شود و این کار را به صورت زیر انجام می دهیم.

```bash
const api = axios.create({ baseURL: 'https://openapi.poulstar.org/' });
```

###### برای اینکه بتوانیم یک store بسازیم و داده های اولیه داخل آن باشد، می توانیم از دستورات <a href="https://quasar.dev/quasar-cli-vite/commands-list">Quasar Command List</a> استفاده کنیم و دستور زیر را بزنیم.

```bash
quasar new store -f ts auth-store
```

###### برای اینکه فرآیند ورود در نرم افزار را فعال کنیم، یک store ساختیم که از تکنولوژی pinia استفاده می کند. در آن ما ساختار های احراز هویت و خروج از سیستم و حفظ و نگهداری ورود را مدیریت می کنیم و آن را به صورت زیر می نویسیم.

```bash
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    expiresAt: 0,
  }),

  getters: {
    isAuthorized(state) {
      return Date.now() < state.expiresAt
    },
  },

  actions: {
    import() {
      this.token = localStorage.getItem('token') ?? '';
      this.expiresAt = parseInt(localStorage.getItem('expiresAt') ?? '0');
      if (this.token.length > 0) {
        api.defaults.headers['Authorization'] = 'Bearer ' + this.token;
      }
    },
    export() {
      localStorage.setItem('token', this.token);
      localStorage.setItem('expiresAt', this.expiresAt.toString());
    },
    async authenticate(username: string, password: string) {
      const response = await api.post('oauth/token', {
        grant_type: 'password',
        username: username,
        password: password,
        client_id: 1,
        client_secret: 'sL8r8yA2o3yGzbXYeb4xsg7Wie3RmKmUTOTFHVoI',
      });
      if (response.status != 200) {
        throw Error('Request error ' + response.status);
      }
      this.token = response.data.access_token;
      this.expiresAt = Date.now() + response.data.expires_in;
      api.defaults.headers['Authorization'] = 'Bearer ' + this.token;
      this.export();
    },
    async logout() {
      this.token = '';
      this.expiresAt = 0;
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
    },
  },
});
```

###### در auth-store ابتدا api را import می کنیم تا بتوانیم به سمت سرور درخواست ارسال کنیم. نام متغیر خود را useAuthStore می گذاریم و از کتاب خانه pinia یک store را تعریف می کنیم.

###### حال باید بدانید که هر store نیاز به یک نام دارد که ما آن را auth قرار دادیم. هر store سه بخش دارد که بخش اول آن جایگاه وضعیت یا قرار گیری متغیر هایی است که در آن store ما نیاز داریم که ما یکی token و دیگری تاریخ انقضاء token است.

###### بخش دیگری دارد که نام آن getters است و در آن تابع هایی می نویسیم تا در صورت لزوم از آن استفاده کنیم یا به عبارتی گزارش دریافت کنیم. ما در این بخش تابعی نوشتیم که محض درخواست به ما معتبر بودن token کاربر را تایید یا  عدم تایید می دهد.

###### پارت سوم مربوط به action ها است که مجموعه کار هایی که می خواهیم این store برای ما انجام دهد را در قالب تابع  در آن می نویسیم. برای کار خود ابتدا یک تابع import نوشتیم که موقع لزوم برای ما بتواند داده های مورد نظر را در auth-store اضافه کند تا به وسیله آن بتوان بررسی کرد آیا کاربر معتبر است یا خیر و بعد رفت سراغ مرحله بعد و برای  اینکه بتوانیم یک ورود را در سیستم یا همان مرورگر به صورت موقت نگه داریم، تابع export را نوشتیم.

###### دو تابع دیگه برای نیاز خود ساختیم، یکی authenticate که به وسیله آن اطلاعات کاربر را به سمت سرور ارسال می کنیم و در صورت صحیح بودن آن را login شده در سیستم در نظر می گیریم و دیگری تابع logout که اگر صدا زده شود، کلید و تاریخ انقضاء ای که تعریف کرده بودیم را از مرورگر حذف می کنیم تا عمل خروج اتفاق بی افتد.

###### گام بعدی نوبت به صفحه LoginPage می رسد که عمل login را ویرایش کنیم. برای این کار ابتدا useAuthStore را import می کنیم.

```bash
import { useAuthStore } from 'src/stores/auth-store';
```
###### متغیری به عنوان authStore می سازیم که تابع useAuthStore به محض اجرا صفحه اجرا شود و در آن نگه داشته شود.

```bash
const authStore = useAuthStore();
```

###### مرحله بعدی در تابع login authStore را صدا می زنیم و با اطلاعات وارد شده درخواست احراز هویت می کنیم. در then اگر درخواست موفق بود، کاربر را به سمت صفحه index می فرستیم و اگر موفق نبود خطا را چاپ می کنیم.

```bash
authStore
  .authenticate(
    loginParameters.value.username,
    loginParameters.value.password
  )
  .then(
    () => {
      router.replace({ name: 'index' });
    },
    (error) => {
      console.log(
        `No Internet, Connection Lost because server not serve!!!\n${error}`
      );
    }
  );
```





