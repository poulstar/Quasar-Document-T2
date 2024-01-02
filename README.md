# تابع در تایپ اسکریپت

## مبحث function در تایپ اسکریپت

###### برای تابع نویسی در تایپ اسکریپت از همان الگو موجود در جاوا اسکریپت می توان استفاده نمود، با این تفاوت که می توان نوع پارامتر ها و همچنین نوع خروجی را تعیین کرد. به مثال زیر دقت نمایید.

```bash
function add (x:number, y:number) : number {
    return x + y;
}
```

###### برای دیدن مثال های بیشتر می توانید به فایل Functions.ts مراجعه نمایید.


## مبحث function type در تایپ اسکریپت

###### در تایپ اسکریپت شما می توانید برای تابع خود نوع پارامتر و خروجی را مشخص کنید، به عبارتی می توانید متغیری تعریف کنید و مشخص کنید اگر تابعی تحت این عنوان بخواهد شکل بگیرد باید چگونه باشد. به مثال زیر دقت کنید.

```bash
let functionName : (a:string, b: string) => string;
functionName = function (x:string, y:string){
  return x + y;
}
```

###### یا نوع بازگشت مقدار را هم تعیین کنید.

```bash
let functionName : (a:string, b: string) => string;
functionName = function (x:string, y:string) : string {
  return x + y;
}
```
###### و اگر arrow function باشد.

```bash
let functionName : (a:string, b: string) => string;
functionName = (x:string, y:string) => {
  return x + y;
}
```
###### و اگر بخواهیم در arrow function نوع مقدار بازگشتی را معین کنیم.

```bash
let functionName : (a:string, b: string) => string;
functionName = (x:string, y:string) : string => {
  return x + y;
}
```

###### برای دیدن مثال های بیشتر می توانید به فایل FunctionTypes.ts رجوع کنید.

## مبحث optional parameter در تایپ اسکریپت

###### بحث optional parameter این است شما می توانید یکی از پارامتر های تابع را شرطی  کنید و متکی به زمانی که اگر وارد شد قرار دهید و نوع آن برای شما مهم باشد. به مثال زیر دقت کنید.

```bash
function multiply(a: number, b: number, c?: number): number {
    if (typeof c !== 'undefined') {
        return a * b * c;
    }
    return a * b;
}
```

###### در مثال فوق مقدار c شرطی است، اگر وارد شود باید نوع آن عدد باشد و اگر وارد نشد پس undefined است که با یک شرط می توان آن را تشخیص داد و جواب نهایی را باز گرداند. برای دیدن مثال های دیگر می توانید به فایل OptionalParameters.ts مراجعه کنید.


## مبحث default parameter در تایپ اسکریپت

###### اگر در تایپ اسکریپت بخواهیم یکی از هر کدام از مقادیر پارامتر ها را از قبل مقدار دهی کنیم که در صورت ارسال نشدن یک مقدار پیش فرض داشته باشد و همچنین نوع آن را هم مشخص کرده باشیم می توانیم به صورت زیر عمل کنیم.

```bash
function changeOpacity (tag:any, opacity:number = 1) : void {
    tag.style.opacity = opacity;
}
```

###### برای دیدن مثال های دیگر می توانید به فایل DefaultParameters.ts مراجعه کنید.


## مبحث rest parameter در تایپ اسکریپت

###### در مبحث rest نویسی برای پارامتر موجود یک تابع می توانید نوع آن را هم مشخص کنید و قاعده array را می توانیم پیاده سازی کنیم.

```bash
function users(...list : string[]) : void {
    for (let i:number=0; i<list.length; i++){
        console.log(list[i]);
    }
}
```

###### برای دیدن مثال های دیگر می توانید به فایل RestParameters.ts مراجعه کنید.


## مبحث function over loading در تایپ اسکریپت

###### همانطور که تاکنون یاد گرفتیم، می توانیم برای تابع های خود هم روی پارامتر و هم روی خروجی آن type تعریف کنیم اما تایپ اسکریپت به ما این اجازه را می دهد که حالت های مختلفی برای یگ تابع تعریف کنیم و خروجی های مختلف را بپذریم که اصطلاحا به آن over loading می گویند. به مثال زیر دقت کنید.

```bash
function add(a: number, b: number): number;
function add(a: string, b: string): string {
   return a + b;
}
```

###### برای دیدن نمونه های دیگر می توانید فایل FunctionOverLoadings.ts را مشاهده نمایید.


