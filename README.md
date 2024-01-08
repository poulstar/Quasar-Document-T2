# پیاده سازی کامل ثبت نام کردن و ساخت کلاس User و ارسال API و مدیریت کردن پاسخ بازگشتی از سمت سرور

###### در پوشه src یک پوشه برای مدل ها خود می سازیم و نام آن را models می گذاریم. فایل user.ts را در آن می سازیم تا درخواست ها کاربر را مجزا مدیریت کنیم. برای اینکه عمل ثبت نام کاربر را بسازیم، قطعه کد زیر را در کلاس user می گذاریم.

```bash
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

export class User {
  static async register(
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
    const response = await api.post<AxiosResponse>('api/register', data);
    if (response.status == 200) {
      return response;
    }
    throw Error('Register Failed');
  }
}
```
###### برای کار خود نیاز به api از فایل axios داریم و از کتاب خانه axios هم نیاز به تایپ AxiosResponse داریم که آن را هم import می کنیم. در کلاس User یک تابع async می سازیم که درخواست ما به سرور را مدیریت کند. تابع از نوع static است تا بدون نیاز به ساخت object هم بتوانیم از تابع استفاده کنیم. تابع ما چهار پارامتر دریافت می کند که آن ها را در یک formData قرار می دهیم و به سمت سرور ارسال می کنیم. در هنگام ارسال هم با await منتظر جواب می مانیم. اگر جواب 200 بود یعنی با موفقیت انجام شده و در غیر این صورت خطا را نمایش می دهیم. اگر آدرس هایی که باید به آن درخواست دهیم یادتان رفت به <a href="https://openapi.poulstar.org/">سرور</a> مراجعه کنید.

###### برای اینکه کار register ما کامل شود نیاز است یکسری کار را در صفحه RegisterPage انجام دهیم. ابتدا در بخش script نیاز داریم تا مدل User را اضافه کنیم.

```bash
import { User } from 'src/models/user';
```

###### بعد آن برای آنکه بتوانیم خطا هایی که از سمت سرور به سوی ما می آید را ذخیره و نمایش دهیم، متغیر های زیر را می سازیم.

```bash
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const avatarError = ref('');
```

###### برای آنکه وضعیت اینکه باید خطا را نمایش دهیم یا نه را توسط چهار متغیر زیر انجام می دهیم.

```bash
const nameState = ref(null);
const emailState = ref(null);
const passwordState = ref(null);
const avatarState = ref(null);
```

###### حال که برای چهار پارامتر هم وضعیت خطا و پیام خطا را داریم، باید آن را با استفاده از الگو content موجود در <a href="https://quasar.dev/vue-components/input/">input props</a> ی که سایت quasar برای ما تعبیه دیده  استفاده کنیم. حال برای بخش name در q-input کد زیر را می نویسیم.

```bash
ref="nameState"
:error="nameError.length > 0"
:error-message="nameError"
```
###### بعد آن نوبت می رسد به email.

```bash
ref="emailState"
:error="emailError.length > 0"
:error-message="emailError"
```

###### بعد آن نوبت می رسد به password.

```bash
ref="passwordState"
:error="passwordError.length > 0"
:error-message="passwordError"
```

###### و سر آخر هم نوبت q-file که برای avatar است کد زیر را می نویسیم.

```bash
ref="avatarState"
:error="avatarError.length > 0"
:error-message="avatarError"
```

###### حال که همه چی محیا  است می رویم سراغ اینکه درخواست دهیم تا محتوا پر شده به سمت سرور رود و کاربر جدید ما ثبت شود و در غیر این صورت خطا را نمایش دهد. به همین منظور قطعه کد زیر را در تابع  register می نویسیم.

```bash
User.register(
  registerParameters.value.name,
  registerParameters.value.email,
  registerParameters.value.password,
  registerParameters.value.avatar
).then(
  (response) => {
    if (response.status == 200) {
      setTimeout(() => {
        router.replace({ name: 'login' });
      }, 1000);
    }
  },
  (reject) => {
    if (reject.response.status != 200) {
      if (reject.response.data.errors) {
        nameError.value = reject.response.data.errors?.name?.toString() ?? '';
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
###### در قطعه کد فوق ما ابتدا پارامتر های مورد نیاز را پر می کنیم و بعد در then برای حالت موفقیت اگر وضعیت 200 بود، صفحه را به صفحه ورود منتقل می کنیم و اگر دارای خطا بود، در بین خطا ها رفته و هر کدام که با هر پارامتر ما مرتبط  است، پیام آن را داخل خطا خودش قرار می دهیم و در انتها بعد از 5 ثانیه همه خطا ها را خالی می کنیم تا نمایش آن  متوقف شود.

###### دقت داشته باشید چند نکته در این صفحه وجود دارد، اول اینکه ref هایی که روی هر input وجود دارد حالت boolean دارد و زمانی که شرط error برقرار می شود به حالت true در می آید و زمانی که شرط برقرار نشود دوباره به حالت false می رسد. نکته بعدی اینکه در تابع register بعضی جاها از علامت ? استفاده کردیم و بعضی جاها از علامت ؟؟. دقت کنید این دو با هم فرق می کند، این نماد ها برای optional کردن است، یکی اگر باشد یعنی اگر وجود داشت و مقدار مورد نظر null نبود به ادامه برو ولی برای حالت دو علامت سوال به این معنی  است که اگر کلا خط ما قبل به سر انجام نرسید شما کار دیگر انجام بده که مثل else عمل می کند.




