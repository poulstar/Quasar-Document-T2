# جلوگیری از ورود کاربر به بخش داشبورد، بدون Login و انتقال آن جهت وارد کردن اطلاعات کاربری خود

###### دو وضعیت متفاوت در سیستم هایی که ما می سازیم وجود دارد، یکی قبل از احراز هویت و دیگری بعد احراز شدن اطلاعات فرد. از همین رو اگر کاربر بخواهد قبل از اینکه login شده وارد داشبورد شود، مانع آن می شویم و او را به صفحه login منتقل می کنیم و برعکس همین هم وجود دارد، کاربری که ورود به سیستم آن تایید می شود، معنی ندارد به صفحه ورود یا ثبت نام برود، از همین رو او را به صفحه داشبورد منتقل می کنیم. به عنوان مثال شما وقتی وارد اینستاگرام خود می شوید، اگر تایید نشود که هویت شما مجاز است، شما را به صفحه login می فرستد. در غیر این صورت بلافاصله برای شما داشبورد را نشان می دهد یا صفحه اصلی نرم افزار از می شود.

###### به همین دلیل ما هم به چند روش این مسئله را انجام می دهیم تا با آن آشنا شوید. اول اینکه می توان یک فایل boot بسازیم که نام آن را auth می گذاریم و این کار را با quasar command  می توانیم انجام دهیم.

```bash
quasar new boot -f ts auth
```
###### بعد اینکه فایل auth ما در پوشه boot ساخته شد قطعه کد زیر را به آن می افزاییم.

```bash
import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth-store';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ urlPath, redirect }) => {
  const auth = useAuthStore();
  auth.import();
  if (urlPath.includes('dashboard') && !urlPath.includes('login')) {
    if (!auth.isAuthorized) {
      redirect({ name: 'login' });
      return;
    }
  } else if (urlPath.includes('login')) {
    if (auth.isAuthorized) {
      redirect({ name: 'index' });
      return;
    }
  }
});
```
###### برای اینکه بتوانیم تشخیص دهیم کاربر در چه وضعیتی است، ابتدا useAuthStore را import می کنیم و در داخل تابع async دو پارامتر یعنی urlPath و redirect را درخواست می کنیم. در داخل تابع متغیری می سازیم که useAuthStore را یک بار اجرا شود و بعد درخواست می کنیم import انجام شود تا بتوانیم از isAuthorized استفاده کنیم. دو شرط با هم باید بررسی شود، اول اینکه در کجا نرم افزار خود هستیم و آدرس url چیست و دوم اینکه احراز هویت شده است یا خیر. از همین رو اول ما url را چک می کنیم و بعد احراز هویت را که آیا مجاز است در آن url باشد یا خیر. در if اول بررسی می کنیم آیا در url کلمه dashboard وجود دارد و به شرط اینکه کلمه login وجود نداشته باشد. اگر شرط بر قرار بود، بررسی احراز هویت مطرح می شود، خب اگر کاربر ما در یکی از صفحات داشبورد است، باید جواب احراز هویت آن مثبت باشد، به همین دلیل ما چک می کنیم اگر احراز هویت مثبت نیست او را منتقل کن به صفحه login و بر عکس همین را هم در شرط پایین دنبال می کنیم.

###### برای اینکه این فایل اجرا شود باید نام آن را در boot فایل quasar.config.js اضافه کنیم.

```bash
boot: [
  'axios',
  'auth',
],
```
###### اگر بخواهیم قطعه کد خود را تست کنیم می توانیم صفحه خود را refresh کنیم و در هنگام اجرا مجدد، فایل های boot فراخوانی می شود و نسبت به مسئله ما واکنش می دهد.

###### روش دیگر این است که ما در فایل routes جلو آن را بگیریم که به محض عوض شدن route چک می کند. برای این کار ما نیاز به تابع beforeEnter داریم. از همین رو مرحله به مرحله جلو می رویم تا فرآیند ما کامل شود. ابتدا useAuthStore را import می کنیم.

```bash
import { useAuthStore } from 'src/stores/auth-store';
```
###### در بخش اول که مسیر های login و register را کنترل می کند، همان اول تابع زیر بدین صورت می نویسیم.
```bash
beforeEnter(to, from, next) {
  const auth = useAuthStore();
  auth.import();
  if (!auth.isAuthorized) {
    next();
  } else {
    next({ name: 'index' });
  }
},
```
###### تابع  beforeEnter سه پارامتر دارد که فعلا با next کار داریم که اجازه دهیم درخواست ادامه پیدا کند یا خیر. در داخل تابع یک بار تابع  useAuthStore را صدا می زنیم و درخواست import می کنیم و چون این بخش منتهی می شود به آدرس های login  و register، اگر احراز هویت نبود بتواند ادامه دهد، در غیر این صورت به صفحه index به رود. و همین کار را برای کلیه مسیر های داشبورد می کنیم و همان اول تابع beforeEnter را می نویسیم، با این تفاوت اگر احراز هویت آن تایید شد ادامه دهد، در غیر این صورت به صفحه login منتقل شود.

```bash
beforeEnter(to, from, next) {
  const auth = useAuthStore();
  auth.import();
  if (auth.isAuthorized) {
    next();
  } else {
    next({ name: 'login' });
  }
},
```
###### برای بخش داشبورد هم یک redirect در نظر می گیریم که اگر کاربر به صورت دستی یکی از فرزندان داشبورد را ننوشت، به صورت خودکار منتقل شود به صفحه index داشبورد.

```bash
redirect: <RouteRecordRedirectOption> route( <RouteCallback> {name: 'index'} ),
```

###### برای اینکه کاربر ما ورود کرده و بتواند از سیستم خروج کند، دکمه logout در صفحه DashboardLayout را فعال می کنیم. برای این کار لازم است دو import انجام دهیم.

```bash
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
```
###### حال تابع ها را باید یک بار اجرا کنیم و در یک متغیر ذخیره نگه داریم، از همین رو در setup و قبل return به صورت زیر دو متغیر را می نویسیم.

```bash
const authStore = useAuthStore();
const router = useRouter();
```
###### حال در تابع logout کد زیر را می نویسیم که وقتی کاربر بر روی آن زد، از سیستم خارج شود و منتقل شود به صفحه ورود.

```bash
authStore.logout();
router.replace({ name: 'login' });
```
###### در زمینه امنیت، گاه ممکن است کاربر ما بعد اینکه وود کرده، درخواست به عملی کند که سطح دسترسی آن را ندارد و چون ممکن است قصد رخنه امنیتی را داشته باشد، دستور logout آن را می دهیم، شماره خطایی که از سمت سرور می آید 403 است که نشان دهنده عدم سطح دسترسی است. این کار را در فایل axios در پوشه boot انجام می دهیم. ابتدا useAuthStore را import می کنیم.

```bash
import { useAuthStore } from 'src/stores/auth-store';
```
###### سپس در انتها تابع boot  دستور زیر را می نویسیم.

```bash
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 403) {
      auth.logout();
    }
    throw error;
  }
);
```
###### در قطعه کد فوق ما هر بار که درخواست api می زنیم، یک دور درخواست بررسی می شود، اگر در آن خطایی با کد 403 بود، کاربر را logout می کند.

