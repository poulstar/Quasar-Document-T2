# مدیریت کردن پروفایل و بروز رسانی آن از طریق API

###### برای اینکه بخش پروفایل کاربر را کامل کنیم، باید به دو عملی که اتفاق می افتد دقت کنیم. اول اینکه مسیری جهت دریافت اطلاعات کاربر وارد سیستم شده بسازیم و مرحله بعد مسیر جهت درخواست ویرایش کاربر موجود خودمان. حال برای این کار ابتدا به فایل user می رویم و قطعه کد ها زیر را می نویسیم.

```bash
static async profile() {
  const response = await api.get('api/user/profile');
  if (response.status == 200) {
    return response;
  }
  throw Error('Profile failed');
}
```
###### برای دریافت پروفایل کاربر، یک تابع async می نویسیم و درخواست می کنیم به آدرسی که سرور برای ما مشخص کرده، با الگویی که تعیین شده و سپس منتظر پاسخ می مانیم. اگر جواب بازگشت که نتیجه را باز می گردانیم و اگر با شکست مواجه شد، تولید خطا می کنیم.

```bash
static async updateProfile(
  id: number,
  username: string,
  email: string,
  password: string,
  avatar: File
) {
  const data = new FormData();
  data.append('name', username);
  data.append('email', email);
  data.append('password', password);
  data.append('avatar', avatar);
  const response = await api.post<AxiosResponse>(
    `api/update-my-profile/${id}`,
    data
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Update Failed');
}
```
###### برای بخش ویرایش کاربر هم یک تابع async می سازیم و پارامتر هایی که سرور از ما خواسته دریافت و در قالب یک form data ارسال می کنیم. اگر پاسخ از سمت سرور موفق بود که نتیجه را متقابلا منعکس می کنیم و اگر نا موفق بود تولید خطا می کنیم.

###### ابتدا به فایل ProfileComponent می رویم تا دریافت داده های پروفایل را از آن جا مدیریت کنیم و بعد به سراغ صفحه DashboardLayout برویم. در فایل ProfileComponent ما نیاز به مدل User داریم، از همین رو آن را import می کنیم.

```bash
import { User } from 'src/models/user'
```
###### بعد آن ما از سمت سرور آدرس عکس را دریافت می کنیم، به همین دلیل برای اینکه آدرس دامنه را به آن اضافه کنیم، متغیری می سازیم تا مقدار آن را در خود ذخیره کند.

```bash
const serverRoute = 'https://openapi.poulstar.org/';
```
###### برای اینکه اطلاعات ویرایش شده با اطلاعاتی که به نمایش در می آید مشترک نشود و در لحظه تغییر نکند، ما یک متغیر profile همانند profileTemp می سازیم.

```bash
const profile = ref({
  modal: false,
  id: 0,
  username: '',
  email: '',
  avatar: 'images/avatar.png',
  newAvatar: undefined,
  password: '',
  role: '',
});
```

###### حال تابعی می سازیم تا درخواست کند جهت دریافت پروفایل کاربر موجود ما و اطلاعات را به ما تحویل دهد و نام آن را userData می گذاریم و پس از دریافت اطلاعات، هر بار، به صورت همزمان هم profileTemp و هم profile را بروز می کنیم.

```bash
const userData = () => {
  User.profile().then((response) => {
    profile.value.id = response.data.user.id;
    profileTemp.value.id = response.data.user.id;
    profile.value.username = response.data.user.name;
    profileTemp.value.username = response.data.user.name;
    profile.value.email = response.data.user.email;
    profileTemp.value.email = response.data.user.email;
    if (response.data.user.media[0]?.url) {
      profile.value.avatar = serverRoute + response.data.user.media[0]?.url;
      profileTemp.value.avatar = serverRoute + response.data.user.media[0]?.url;
    }
    profile.value.role = response.data.user.roles[0].name;
    profileTemp.value.role = response.data.user.roles[0].name;
  });
};
userData();
```

###### پس از آن داده های جدید را export می کنیم.
```bash
export { profileTemp, profile, userData };
```
###### حال نوبت آن رسیده که به سراغ DashboardLayout برویم و کار خود را به سر انجام برسانیم. در بخش script داده های دریافتی یا import های ProfileComponent را افزایش می دهیم.

```bash
import { profileTemp, profile, userData } from 'components/ts/ProfileComponent';
```

###### بعد آن نیاز داریم تا در بخش ویرایش پروفایل به مدل User دسترسی داشته باشیم، به همین دلیل آن را هم import می کنیم.

```bash
import { User } from 'src/models/user';
```

###### در بخش setup تا قبل return لازم است یکسری متغیر ساخته شود تا از آن ها مثل دفعات قبل استفاده کنیم.

```bash
userData();
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const avatarError = ref('');

const nameState = ref(null);
const emailState = ref(null);
const passwordState = ref(null);
const avatarState = ref(null);
```
###### در بخش return هم باید یکسری از این متغیر ها را برگردانیم تا بشود در template از آن ها استفاده کرد.

```bash
nameError,
emailError,
passwordError,
avatarError,

nameState,
emailState,
passwordState,
avatarState,

profile,
```

###### و در تابع update هم نیاز داریم تا به محض درخواست، کلیه اطلاعات پر شده در profile را ارسال کنید و باز مثل الگو register اگر درخواست با موفقیت انجام شده یک عمل انجام دهد و اگر موفق نشد یک عمل دیگر که ما اینجا به شکل زیر عمل کردیم.

```bash
User.updateProfile(
  profile.value.id,
  profile.value.username,
  profile.value.email,
  profile.value.password,
  profile.value.newAvatar
).then(
  (response) => {
    if (response.status == 200) {
      userData();
      profile.value.modal = !profile.value.modal;
    }
  },
  (reject) => {
    if (reject.response.status != 200) {
      if (reject.response.data.errors) {
        nameError.value =
          reject.response.data.errors?.name?.toString() ?? '';
        emailError.value =
          reject.response.data.errors?.email?.toString() ?? '';
        passwordError.value =
          reject.response.data.errors?.password?.toString() ?? '';
        avatarError.value =
          reject.response.data.errors?.avatar?.toString() ?? '';
        setTimeout(() => {
          nameError.value = '';
          emailError.value = '';
          passwordError.value = '';
          avatarError.value = '';
        }, 5000);
      }
    }
  }
);
```

###### زمانی که موفق شد، دستور می دهیم مجدد پروفایل دریافت شود که این کار توسط تابع userData انجام می شود و بعد dialog بسته شود و اگر دچار خطا شد مقدار های نمایش خطا را با خطا های مربوطه آن پر کند تا نمایش داده شود و بعد 5 ثانیه مجدد آن را خالی کند.

###### حال نوبت آن رسیده تا به بخش template برویم.

###### بر روی q-dialog رفته و سعی به تغییر آن می کنیم تا با v-model جدید اجرا شود.
```bash
<q-dialog v-model="profile.modal" persistent>
```
###### بعد روی q-input مربوط به name رفته و مقدار زیر را به آن اضافه می کنیم.
```bash
ref="nameState"
:error="nameError.length > 0"
:error-message="nameError"
```
###### بعد روی q-input مربوط به email رفته و مقدار زیر را به آن اضافه می کنیم.
```bash
ref="emailState"
:error="emailError.length > 0"
:error-message="emailError"
```
###### بعد روی q-input مربوط به password رفته و مقدار زیر را به آن اضافه می کنیم.
```bash
ref="passwordState"
:error="passwordError.length > 0"
:error-message="passwordError"
```
###### بعد روی q-file مربوط به avatar رفته و مقدار زیر را به آن اضافه می کنیم.
```bash
ref="avatarState"
:error="avatarError.length > 0"
:error-message="avatarError"
```
###### متغیری که برای خالی شدن q-file استفاده شده است را نیز تغییر می دهیم.

```bash
click.stop.prevent="profile.newAvatar = null"
```
###### حال می توانید quasar dev کنید و از کدی که نوشته اید تست بگیرید.
