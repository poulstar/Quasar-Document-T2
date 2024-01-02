# کلاس در تایپ اسکریپت

## مبحث class در تایپ اسکریپت

###### در تایپ اسکریپت نیز شما می توانید مانند جاوا اسکریپت از الگو جاوا اسکریپت در class نویسی استفاده کنید. به مثال زیر دقت کنید.

```bash
class User {
    firstName : string;
    lastName : string;
    age : number;
    stature : number;

    constructor(
        first_name:string,
        last_name:string,
        age:number,
        stature:number,
    ){
        this.firstName = first_name;
        this.lastName = last_name;
        this.age = age;
        this.stature = stature;
    }

    bio() : string {
        return `My name is ${this.firstName} ${this.lastName}. I ${this.age} years old and my stature is ${this.stature} cm.`;
    }
}
```

###### برای دیدن نمونه های بیشتر می توانید به فایل Classes.ts مراجعه کنید.

## مبحث access modifier در تایپ اسکریپت

###### در تایپ اسکریپت مانند دیگر زبان ها شما می توانید property های class را تعیین کنید و برای آن های دسترسی تعریف کنید، این در حالی است که جاوا اسکریپت این موضوع را ندارد. اگر به مثال زیر توجه کنید، می بینید که firstName و lastName هر دو از نوع private هستند و یعنی از بیرون class قابل دسترسی نیستند.

```bash
class User {
    private firstName : string;
    private lastName : string;

    constructor(
        first_name:string,
        last_name:string,
    ){
        this.firstName = first_name;
        this.lastName = last_name;
    }

    bio() : string {
        return `My name is ${this.firstName} ${this.lastName}.`;
    }
}
```

###### برای مشاهده نمونه های دیگر می توانید به فایل AccessModifiers.ts مراجعه کنید.

## مبحث readonly modifier در تایپ اسکریپت

###### در تایپ اسکریپت شما می توانید دسترسی به یک property را فقط جهت خواندن  قرار دهید و بعد اینکه object مورد نظر ساخته شد دیگر امکان تغییر مجدد ـن نخواهد بود. به نمونه کد زیر دقت کنید.

```bash
class User {
    private firstName : string;
    private lastName : string;
    readonly bornYear : number;
    constructor(
        first_name:string,
        last_name:string,
        born_year:number
    ){
        this.firstName = first_name;
        this.lastName = last_name;
        this.bornYear = born_year;
    }
}
```

###### اگر user ساخته شود و سال تولد آن در زمان ایجاد یک user تعیین شود، دیگر امکان تغییر آن وجود ندارد و صرفا می شود آن را مشاهده یا چاپ نمود. برای دیدن نمونه های دیگر می توانید به فایل TheReadonlyModifier.ts مشاهده کنید.


## مبحث getter and setter در تایپ اسکریپت

###### در تایپ اسکریپت شما می توانید بدون قرار گیری در ساختار تعریف تابع های set و get جاوا اسکریپت، اقدام به ساخت این تابع ها نمایید و از constructor نیز استفاده نکنید و برای شرایط های مختلف برنامه یا شرط خاص خود را داشته باشید. به نمونه کد زیر دقت کنید.

```bash
class User {
    name : string;
    
    public get getName(){
        return this.name;
    }

    public set setName(_name:string){
        this.name = _name;
    }
}
```

###### در نمونه کد بالا class مربوط به user ما در خود یک property تحت عنوان name دارد که از طریق تابع عمومی getName می تواند داده نام کاربر خود را دریافت کند و همچنین از طریق setName می تواند مقدار مورد نظر خود را لحاظ کند. دقت کنید که موقع گرفتن و قرار دادن داده، بعد public از کلمه set و get استفاده شده است. برای دیدن نمونه های بیشتر می توانید به فایل GettersAndSetters.ts مراجعه کنید.


## مبحث inheritance در تایپ اسکریپت

###### مبحث ارث بری یکی از پر کاربرد ترین بخش های یک class است که در توسعه یک سیستم بسیار کمک کننده است. از همین رو تایپ اسکریپت نیز  مانند دیگر زبان ها، شرایط استفاده از ارث بری به فراهم می کند و اگر کسی الگو ارث بری زبان های برنامه نویسی دیگر را بداند، می تواند با تایپ اسکریپت class خود را توسعه دهد. به مثال زیر توجه کنید.

```bash
class User {
    firstName : string;
    lastName : string;

    constructor(
        first_name:string,
        last_name:string,
    ){
        this.firstName = first_name;
        this.lastName = last_name;
    }
}

class student extends User {
    private ssn : number;
    constructor(
        first_name:string,
        last_name:string,
        ssn:number
    ){
        super(first_name,last_name)
        this.ssn = ssn;
    }
}
```

###### در مثال فوق class کاربر ما ساخته شده است و در کنار آن class دانش آموز نیز ساخته شده است که با کلمه extends از class کاربر نیز ارث برده است و از تمام ویژگی ای کاربر بدون نوشتن آن استفاده می کند. برای دیدن مثال های بیشتر می توانید به فایل Inheritance.ts مراجعه کنید.


## مبحث static method and properties در تایپ اسکریپت

###### یکی دیگر از نیاز هایی که در class ها با آن رو به رو هستیم. بحث مربوط به static سازی است که کمک می کند بدون نیاز به ساخت یک object از class به property یا method آن class دسترسی داشته باشیم. به نمونه کد زیر دقت کنید.

```bash
class User {
    firstName : string;
    lastName : string;
    static numberOfUser: number = 0;

    constructor(
        first_name:string,
        last_name:string,
    ){
        this.firstName = first_name;
        this.lastName = last_name;
        User.numberOfUser ++;
    }

    public static userCount():number {
        return User.numberOfUser;
    }
}
```

###### در class کاربر ما تعداد کاربرانی که ساخته شده اند را می توان فقط با فراخوانی از طریق دستور User.numberOfUser دست یافت. و اگر بخواهیم می توانیم همین کار را با تابع ها هم انجام دهیم که فقط لازم است قبل نام تابع کلمه static را قید کنیم. برای دیدن مثال های بیشتر می توانید به فایل StaticMethodsAndProperties.ts مراجعه کنید.


## مبحث abstract class در تایپ اسکریپت

###### یکی دیگر از مواردی که در تایپ اسکریپت با آن رو به رو می شویم، بحث مربوط به abstract است. اساسا اگر class را با عنوان abstract تعریف کنیم، یعنی فقط آن را برای ارث بری آماده کرده ایم و نمی شود یک نمونه از آن ساخت. به کد زیر دقت کنید.

```bash
abstract class User {
    firstName : string;
    lastName : string;

    constructor(
        first_name:string,
        last_name:string,
    ){
        this.firstName = first_name;
        this.lastName = last_name;
    }
}

class student extends User {
    constructor(
        first_name:string,
        last_name:string,
        private ssn:number
    ){
        super(first_name,last_name)
    }
}
```

###### در مثال فوق ما class کاربر خود را از نوع abstract تعریف نموده ایم. این به این معنا است که نمی شود new User را درخواست کنیم. چون class کاربر ما فقط جهت ارث بری ساخته شده است. برای دیدن مثال های دیگر می توانید به فایل AbstractClasses.ts مراجعه نمایید.
