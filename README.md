# ساخت prototype همه کاربران با امکانات کامل ویژه ادمین سایت


###### برای ساخت بخش کاربران که مدیر سایت بتواند تسلط کامل داشته باشد و چهار عمل اصلی خواندن، ساختن، ویرایش و حذف را انجام دهد، نیاز به component های مورد نظر داریم. از همین رو component از نوع ts به نام AllUserComponent را می سازیم و قطعه کد زیر را داخل آن می نویسیم.

```bash
import { ref } from 'vue';

const columns: any[] = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: 'User Name', field: 'name', sortable: true },
  { name: 'email', align: 'center', label: 'E-Mail', field: 'email', sortable: true },
]

const rows = ref([
  {
    id: 1,
    name: 'hossein',
    email: 'hossein@gmail.com',
    role: [{name:'admin'}]
  },
  {
    id: 2,
    name: 'hossein',
    email: 'hossein@gmail.com',
    role: [{name:'user'}]
  },,

]);

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 100
})

export {columns, rows, pagination}
```

###### در این بخش ستون های مورد نظر خود را می سازیم و متغیر columns از همین جهت مثل الگو های قبلی ساخته می شود و داده های موقت خود را در قالب rows می سازیم و همچنین ساختار pagination را تا در آینده از آن استفاده کنیم.

###### برای اینکه مدیر سایت ما بتواند کاربری  جدید به سیستم اضافه کند و این کار را با الگو modal پیاده سازی کنیم، یک component از نوع vue  به نام AdminCreateUser می سازیم و بخش script آن را به صورت زیر می نویسیم.

```bash
<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  modal: {
    default: false,
  },
});

const options = ref(['admin', 'user']);

const createUserParameter = ref({
  username: '',
  email: '',
  password: '',
  avatar: undefined,
  role: 'user',
});

const emit = defineEmits(['update:modal']);

const close = () => {
  emit.call(this, 'update:modal', false);
};
const accepted = () => {
  console.log(
    createUserParameter.value.username,
    createUserParameter.value.email,
    createUserParameter.value.password,
    createUserParameter.value.avatar,
    createUserParameter.value.role
  );
  emit.call(this, 'update:modal', false);
};
</script>
```

###### باز هم مثل قبل مواردی که نیاز داریم را import می کنیم و props مورد نظر خود را می سازیم. در این component ما نیاز به یک لیست کشویی داریم و برای اینکه حالت ها مختلف را داشته باشیم، یک متغیر ساختیم و همه حالت ها را در آن قرار دادیم. متغیری هم برای نگه داری داده های وارد شده در نظر گرفتیم. برای بخش template هم به صورت زیر عمل می کنیم.

```bash
<template>
  <q-dialog :model-value="props.modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New User</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model:model-value="createUserParameter.username"
          label="Enter Your User Name"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model:model-value="createUserParameter.email"
          label="Enter Your E-Mail"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          type="password"
          dense
          v-model:model-value="createUserParameter.password"
          label="Enter Your Password"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file
          filled
          bottom-slots
          v-model:model-value="createUserParameter.avatar"
          label="Avatar"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="createUserParameter.avatar = null"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:hint> File Size </template>
        </q-file>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="createUserParameter.role"
          :options="options"
          label="Role"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close" />
        <q-btn
          color="light-blue-8"
          icon-right="create"
          label="Create"
          @click="accepted"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
```

###### برای فرم خود مثل همیشه input های مورد نیاز خود را می گذاریم و به متغیر مربوط به آن متصل می کنیم. برای آنکه مدیر سایت بتواند عمل ویرایش را انجام دهد نیاز به یک component از نوع vue است که نام آن را AdminUpdateUser می گذاریم و در بخش script آن به صورت زیر می نویسیم.

```bash
<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  modal: {
    default: false,
  },
  data: {},
});

const options = ref(['admin', 'user']);

const updateUserParameter = ref({
  username: '',
  email: '',
  password: '',
  avatar: undefined,
  role: 'user',
});

watch(props, () => {
  updateUserParameter.value = {
    username: props.data.name,
    email: props.data.email,
    password: props.data.password,
    avatar: updateUserParameter.value.avatar,
    role: props.data.role,
  };
});

const emit = defineEmits(['update:modal']);

const close = () => {
  emit.call(this, 'update:modal', false);
};
const accepted = () => {
  console.log(
    updateUserParameter.value.username,
    updateUserParameter.value.email,
    updateUserParameter.value.password,
    updateUserParameter.value.avatar,
    updateUserParameter.value.role
  );
  emit.call(this, 'update:modal', false);
};
</script>
```
###### در این مرحله هم مثل موارد قبلی برای کار خود مواردی که می خواهیم را import می کنیم و props را به گونه ای می نویسیم که بتوانیم data را دریافت کنیم و یک watch می سازیم که در صورت تغییر داده در لایه بالا تر در این component هم داده ها تغییر کند. برای template هم به صورت زیر می نویسیم.

```bash
<template>
  <q-dialog :model-value="props.modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update User</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model:model-value="updateUserParameter.username"
          label="Enter Your User Name"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model:model-value="updateUserParameter.email"
          label="Enter Your E-Mail"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          type="password"
          dense
          v-model:model-value="updateUserParameter.password"
          label="Enter Your Password"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file
          filled
          bottom-slots
          v-model:model-value="updateUserParameter.avatar"
          label="Avatar"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="updateUserParameter.avatar = null"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:hint> File Size </template>
        </q-file>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="updateUserParameter.role"
          :options="options"
          label="Role"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close" />
        <q-btn
          color="light-blue-8"
          icon-right="create"
          label="Create"
          @click="accepted"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
```
###### برای بخش template هم می توانیم از همان ساختار داخل AdminCreateUser استفاده کنیم و هر input را با متغیر مورد نظر خود متصل کنیم. حال برای عمل حذف داده یک component از نوع vue به نام adminDeleteUser می سازیم و آن را به صورت زیر پیاده سازی می نماییم.

```bash
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modal: {
    default: false,
  },
  data: {},
});

const emit = defineEmits(['update:modal']);

const close = () => {
  emit.call(this, 'update:modal', false);
};
const accepted = () => {
  emit.call(this, 'update:modal', false);
};
</script>
```

###### در اسکریپت آن فقط مواردی که نیاز است را می نویسیم که تعریف props و تایید و عدم تایید موقتا نیاز است که اگر در آینده مورد را خواستیم اضافه کنیم، بر آن می افزاییم. در بخش template آن هم به صورت زیر عمل می کنیم.

```bash
<template>
  <q-dialog :model-value="props.modal" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >Are You Sure, Want You To Delete {{ props.data.name }}?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="light-blue-8"
          icon-right="close"
          label="Cancel"
          @click="close"
        />
        <q-btn
          color="red"
          icon-right="delete"
          label="Delete"
          @click="accepted"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
```

###### یکی از dialog های موجود در quasar را بر می داریم که به ما امکان تایید یا عدم تایید را بدهد و یک متنی را هم نمایش بدهد. از همین رو الگو بالا را استفاده نمودیم و در پیام  آن فقط نام کاربر را نمایش می دهیم تا اگر مطمئن باشید نسبت به این عمل، حذف را انجام دهیم.

###### برای اینکه تمام کار های خود را تمام کنیم و صفحه همه کاربران  را بسازیم در AllUserPage اول script را به صورت زیر کامل می کنیم.

```bash
<script lang="ts" setup>
import { ref } from 'vue';
import { columns, rows, pagination } from 'components/ts/AllUserComponent';
import AdminCreateUser from 'components/vue/AdminCreateUser.vue';
import AdminUpdateUser from 'components/vue/AdminUpdateUser.vue';
import AdminDeleteUser from 'components/vue/AdminDeleteUser.vue';

const filter = ref('');

const createUserParameter = ref({
  modal: <boolean>false,
});
const updateUserParameter = ref({
  modal: <boolean>false,
  id: <number>0,
  name: <string>'',
  email: <string>'',
  role: <string>'',
});
const deleteUserParameter = ref({
  modal: <boolean>false,
  id: <number>0,
  name: <string>'',
});

const createUser = () => {
  createUserParameter.value.modal = !createUserParameter.value.modal;
};

const updateUser = (row: any) => {
  updateUserParameter.value.id = row.id;
  updateUserParameter.value.name = row.name;
  updateUserParameter.value.email = row.email;
  updateUserParameter.value.role = row.role[0].name;
  updateUserParameter.value.modal = !updateUserParameter.value.modal;
};

const deleteUser = (row: any) => {
  deleteUserParameter.value.id = row.id;
  deleteUserParameter.value.name = row.name;
  deleteUserParameter.value.modal = !deleteUserParameter.value.modal;
};
</script>
```
###### مواردی که مورد نیاز است را import می کنیم و متغیر ها را متناسب با نیاز خود در هر وضعیت می سازیم و برای سه عمل افزودن، ویرایش و حذف نیاز به یک تابع داریم که آن ها را به صورت فوق می سازیم و داده ها را به component منتقل می کنیم. برای بخش template آن هم به صورت زیر عمل می کنیم.

```bash
<template>
  <div class="q-pa-md q-mb-lg overflow-auto window-height">
    <q-table
      :grid="$q.screen.xs"
      title="All Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :rows-per-page-options="[pagination.rowsPerPage]"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input
          class="bg-white"
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          label="Create New User"
          color="light-blue-8"
          class="q-ml-md"
          @click="createUser()"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width> Tools </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              class="q-ma-sm"
              size="md"
              color="warning"
              dense
              icon="update"
              @click="updateUser(props.row)"
            />
            <q-btn
              class="q-ma-sm"
              size="md"
              color="red"
              dense
              icon="delete"
              @click="deleteUser(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <AdminCreateUser v-model:modal="createUserParameter.modal"></AdminCreateUser>
  <AdminUpdateUser
    v-model:modal="updateUserParameter.modal"
    v-model:data="updateUserParameter"
  ></AdminUpdateUser>
  <AdminDeleteUser
    v-model:modal="deleteUserParameter.modal"
    v-model:data="deleteUserParameter"
  ></AdminDeleteUser>
</template>
```

###### باز از همان الگو جدول که در صفحات قبل تر استفاده کرده بودیم استفاده می کنیم و در انتهای کار component ها را قرار می دهیم و props های آن را به صورت درست پر می نماییم تا به نحو احسن  کار کند.


