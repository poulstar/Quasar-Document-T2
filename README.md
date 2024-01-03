# آموزش نصب Quasar و آشنایی با چارچوب ها و ساختار آن



## نصب quasar

###### برای نصب quasar وجود یکسری پیش نیاز ها ضروری است.

###### اول اینکه باید از نصب <a href="https://nodejs.org/">node</a> در سیستم خود مطمئن شوید. برای اطمینان از این امر از اجرا دو دستور زیر اطمینان حاصل نمایید، اگر جواب سیستم بازگشت و نسخه node و npm را بازگرداند، می توانید به مرحله بعد بروید.

```bash
node --version
```
```bash
npm --version
```

###### سپس بعد آن تلاش می کنیم برای سیستم خود پکیج مربوط به <a href="https://v1.quasar.dev/quasar-cli/installation">quasar cli</a> را نصب کنیم، نصب آن از طریق دستور زیر است.

```bash
npm install -g @quasar/cli
```

###### پس از نصب پکیج، می توانید با <a href="https://v1.quasar.dev/quasar-cli/installation">دستور ترمینالی</a> زیر شروع به نصب quasar  کنید.

```bash
npm init quasar
```


###### پس از زدن دستور فوق و نصب اولیه، یکسری سوالات پرسیده می شود که می توان بدین گونه به آن پاسخ داد.

```bash
? What would you like to build? » - Use arrow-keys. Return to submit.
>   App with Quasar CLI, let's go!
    spa/pwa/ssr/bex/electron/capacitor/cordova
    AppExtension (AE) for Quasar CLI
    Quasar UI kit
```
###### گزینه App with Quasar CLI, let's go! را انتخاب می کنیم.

###### پس از آن از شما  Project folder: » quasar-project را می پرسد، می توانید نام پوشه و همچنین پروژه خود را تعیین کنید

```bash
? Project folder: » SocialMedia
```

###### گزینه بعدی از شما نسخه ای که می خواهید استفاده کنید را می پرسد، بهتر است جدید ترین را بر گزینید.

```bash
? Pick Quasar version: » - Use arrow-keys. Return to submit.
>   Quasar v2 (Vue 3 | latest and greatest) - recommended
    Quasar v1 (Vue 2)
```

###### گزینه بعدی از شما می خواهد که نوع زبان را انتخاب کنید، چون ما تایپ اسکریپت آموخته ایم، ترجیح می دهیم تایپ اسکریپت انتخاب شود.

```bash
? Pick script type: » - Use arrow-keys. Return to submit.
    Javascript
>   Typescript
```

###### در مرحله بعدی از شما می خواهد که تعیین کنید از کدام الگو load شدن می خواهید استفاده کنید. در حال حاضر چون vite سبک تر و سریع تر است، از آن استفاده می کنیم.

```bash
? Pick Quasar App CLI variant: » - Use arrow-keys. Return to submit.
>   Quasar App CLI with Vite - recommended
    Quasar App CLI with Webpack
```
###### گزینه بعدی اسم پکیج را از شما می خواهد که ما معمولا با نام پروژه یکسان می گذاریم.

```bash
? Package name: » socialmedia
```
###### گزینه بعدی تعیین نام محصول است که به اختیار می توانید نام مرد نظر خود را بگذارید ولی فعلا ما همان پیشفرض را انتخاب می کنم.


```bash
? Project product name: (must start with letter if building mobile apps) » Quasar App
```
###### در گزینه بعدی از شما توضیحی ای از پروژه می خواهد که در صورت لزوم می توانید آن را پر کنید، در غیر این صورت از همان پیشفرض استفاده کنید.

```bash
? Project description: » A Quasar Project
```

###### مرحله بعدی از شما نام نویسنده را می پرسد که می توانید نام خود را وارد کنید؛ در غیر این صورت پیشفرض را تایید کنید.

```bash
? Author: » hossein
```


###### مرحله بعدی باید یک نوع از Vue component ها را انتخاب کنیم که ما Composition API را انتخاب می کنیم.

```bash
? Pick a Vue component style: » - Use arrow-keys. Return to submit.
>   Composition API - recommended
    Composition API with <script setup>
    Options API
    Class-based
```

###### در مرحله بعد از شما می خواهد که وضعیت خود را نسبت به انتخاب preprocessor تعیین کنید. ما خود از حالت Sass with SCSS syntax استفاده می کنم.

```bash
? Pick your CSS preprocessor: » - Use arrow-keys. Return to submit.
>   Sass with SCSS syntax
    Sass with indented syntax
    None (the others will still be available)
```

###### در مرحله بعد از شما می خواهد که ویژگی هایی که برای پروژه خود می خواهید را انتخاب کنید. ما برای این پروژه ESLint و  State Management (Pinia) و  Axios را نیاز داریم و هر یک را با فشردن space بر روی آن انتخاب می  کنیم و در نهایت تایید می کنیم.

```bash
? Check the features needed for your project: »
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
(*)   ESLint
(*)   State Management (Pinia)
( )   State Management (Vuex) [DEPRECATED by Vue Team]
(*)   Axios
( )   Vue-i18n
```

###### مرحله بعدی از شما می خواهد که مدل ESLint خود را انتخاب کنید که ما Prettier را انتخاب می کنیم.

```bash
? Pick an ESLint preset: » - Use arrow-keys. Return to submit.
>   Prettier - https://github.com/prettier/prettier
    Standard
    Airbnb
```

###### سر انجام از ما می پرسد که آیا می خواهیم پکیج npm در پروژه نصب شود که ما Yes, use npm را انتخاب می کنیم.

```bash
? Install project dependencies? (recommended) » - Use arrow-keys. Return to submit.
>   Yes, use npm
    No, I will handle that myself
```

###### دقت کنید که گاه ممکن است مجموعه ترتیب هایی که در ترمینال گفتیم به همان شکل نباشد؛ از همین رو همه حالات را گذاشتیم تا بتوان در انتخاب دچار اشتباه نشویم.

###### پس از آن که کار نصب تمام شد، پروژه خود را با VSCode اجرا کنید و در بخش extension بروید و پکیج Aya Vue3 extension Pack را کامل نصب کنید.

###### پس از باز شدن پروژه می توانید از طریق ترمینال VSCode دستور زیر را بزنید تا پروژه اجرا شود.

```bash
quasar dev
```
###### پوشه .quasar فایل های جاوا اسکریپتی است که به اجرا شدن تگ های quasar کمک می کند. در صورت نبود آن با دستور نصب node نصب می شود.

###### پوشه .vscode تنظیمات مربوط به VSCode شما را در خود نگه می دارد.

###### پوشه node_modules پوشه ای است که تمام پک های مورد نیاز پروژه شما را در خود دارد تا بتوان آن را اجرا کند. در صورت نبود این پوشه می توانید یکی از دستورات زیر را بزنید تا نصب شود.

```bash
npm install
```

###### یا

```bash
npm i
```

###### پوشه public پوشه ای است که در پروژه به صورت مستقیم به آن دسترسی دارید و می توانید هر آنچه در داخل آن است را مستقیم فراخوانی کنید.

###### قبل اینکه وارد پوشه src شویم ابتدا فایل های زیرین را معرفی کنیم و بعد باز گردیم به آخرین پوشه ای که مانده است.

###### فایل .editorconfig جهت تنظیمات ویرایشگر شما در پروژه شکل گرفته است.

###### فایل های .eslintignore و .eslintrc.cjs فایل های مربوط به تنظیمات ESLint است که در هنگام نصب آن را تایید کردیم.

###### فایل بعدی .gitignore است که می توانید تعیین کنید موقع پوش کردن بر روی گیت کدام پوشه ها یا فایل ها ارسال نشود. ما پوشه .quasar و .vscode را به لیستش اضافه کردیم، حال شما می توانید به اختیار خود هر آنچه را که دوست دارید در آن بنویسید.

###### فایل .npmrc مربوط به option هایی است که به npm اضافه می شود.

###### فایل .prettierrc فایلی است که در آن تنظیمات مربوط به prettier نیز قرار گرفته است.

###### فایل index.html فایلی است که شروع اجرا و فایل های مورد نظر با آن شروع می شود.

###### فایل های package-lock.json و package.json فایل هایی است که از طریق آن پکیج های مورد نیاز پروژه تعیین می شود و در صورت درخواست نصب node، از روی آن، پکیج های مورد نظر نصب می شود.


###### فایل postcss.config.cjs فایلی است ک تنظیمات مربوط به css های ارسالی را مدیریت می کند.


###### فایل quasar.config.js فایلی است که تنظیمات مربوط به quasar در آن قرار می گیرد.

###### فایل README.md فایلی است که در آن می نویسیم جهت مطالعه کاربران دیگر.

###### فایل tsconfig.json فایلی است که توسط آن تایپ اسکریپت را مدیریت می کنیم.

###### حال نوبت محتوا درون پوشه src است.

###### پوشه assets پوشه ای است که فایل های مورد نیاز خود را می توان در آن قرار دهیم. مانند css, js و ... .

###### پوشه boot پوشه ای است که موقع load شدن سیستم، فایل های ابتدایی در آن اجرا می شود.


###### پوشه components پوشه است که اگر بخواهید component سازی کنید، جهت نظم می توانید فایل های خود را در داخل آن قرار دهید.

###### پوشه css پوشه ای است که css های سراسری و مورد نیاز پروژه در داخل آن تعریف می شود.

###### پوشه layouts پوشه ای است که در آن چارچوب های مورد نظر خود را می سازیم و دیگر صفحات را مبتنی بر آن گسترش می دهیم.

###### پوشه pages پوشه ای است که صفحات را جهت نظم در آن قرار می دهیم و متناسب با آن با نیاز به یک layout متصل می کنیم.

###### پوشه router پوشه ای است که مسیر های url را در داخل آن تعیین می کنیم و کلیه تنظیمات مربوط به مسیر سازی در آن صورت می گیرد.

###### پوشه stores پوشه ای است که مکانیزم های ذخیره سازی را در آن مدیریت می کنیم و تکنولوژی pinia که موقع نصب آن را تایید کردیم، در این پوشه مورد استفاده قرار می گیرد.

###### فایل App.vue فایلی است که شروع quasar را مدیریت می کند و app با آن آغاز می شود.
