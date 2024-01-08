# ساخت prototype همه پست ها با امکانات کامل ویژه ادمین سایت


###### برای ساخت بخش تمام پست ها که مدیر  سایت آن را می بیند هم نیاز به component ها مخصوص آن داریم. از همین رو شروع می کنیم به ساخت component از نوغ ts  برای دریافت داده های مورد نظر و نمایش آن در صفحه خود جهت فهرستی که قرار است انجام دهیم.

```bash
import { ref } from 'vue';

const columns: any[] = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'username', align: 'center', label: 'User Name', field: 'username', sortable: true,format: (val:any) => `${val.name}` },
  { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
  { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true,format: (val:string) => `${val.slice(0,40)} ...` },
]

const rows = ref([
  {
    id: 1,
    image: 'images/mountains.jpg',
    title: 'fake',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
    username: {name:'hossein'}
  },
  {
    id: 2,
    image: 'images/mountains.jpg',
    title: 'fake',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available',
    username: {name:'hossein'}
  },

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

###### در این component شما می توانید از MyPostComponent نیز استفاده کنید. فقط چون قرار است در ستون های خود نام کاربر هر پست را ذکر کنیم و ساختار آن از سمت سرور به گونه ای است که یک object به شما می دهد. از همین رو هم در ستون و هم در ردیف الگو object و استخراج داده از آن را پیاده سازی می کنیم.

###### در مرحله بعدی ما نیاز به یک component جهت نمایش dialog داریم تا بتوانیم ویرایش کاربر را پیاده سازی کنیم. برای این کار می توانیم از UserUpdatePost استفاده کنیم. از همین رو component از نوع vue به اسم AdminUpdatePost را می سازیم و داده ها را به صورت زیر می نویسیم.

```bash
<template>
  <q-dialog :model-value="props.modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update Post</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model:model-value="updatePostParameter.title"
          label="Enter Your Title"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          type="textarea"
          dense
          v-model:model-value="updatePostParameter.description"
          label="Enter Your Description"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file
          filled
          bottom-slots
          v-model:model-value="updatePostParameter.image"
          label="Post Image"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="updatePostParameter.image = null"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:hint> File Size </template>
        </q-file>
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

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  modal: {
    default: false,
  },
  data: {}
});

const updatePostParameter = ref({
  id: 0,
  title: '',
  description: '',
  image: undefined,
});

watch(props, () => {
  updatePostParameter.value = {
    title: props.data.title,
    description: props.data.description,
    image: updatePostParameter.value.image,
  };
});

const emit = defineEmits(['update:modal']);

const close = () => {
  emit.call(this, 'update:modal', false);
};

const accepted = () => {
  console.log(
    updatePostParameter.value.title,
    updatePostParameter.value.description,
    updatePostParameter.value.image
  );

  emit.call(this, 'update:modal', false);
};
</script>
```
###### برای اینکه مدیر سایت بتواند پست ها را حذف کند هم نیاز به component داریم. به همین دلیل یک component از نوع vue می سازیم و نام آن را AdminDeletePost می گذاریم و برای نوشتن محتوا آن می توانیم از UserDeletePost کمک بگیریم.

```bash
<template>
  <q-dialog :model-value="props.modal" persistent>
    <q-card style="min-width: 350px">
      <q-tab-panels v-model="tab" animated class="full-width">
        <q-tab-panel name="image">
          <q-img
            :src="props.data.image"
            :fit="'cover'"
            width="100%"
            height="300px"
          />
        </q-tab-panel>

        <q-tab-panel name="map"> Map Part </q-tab-panel>
      </q-tab-panels>
      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
          @click="changeTab()"
        />
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ props.data.title }}
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ props.data.username }}
        </div>
        <div class="text-caption text-grey">
          {{ props.data.description.substring(0, 200) }} ...
        </div>
      </q-card-section>
      <q-separator />
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
          label="Remove"
          @click="accepted"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  modal: {
    default: false,
  },
  data: {},
});

const tab = ref('image');
const changeTab = () => {
  if (tab.value == 'image') tab.value = 'map';
  else tab.value = 'image';
};

const emit = defineEmits(['update:modal']);

const close = () => {
  emit.call(this, 'update:modal', false);
};

const accepted = () => {
  emit.call(this, 'update:modal', false);
};
</script>
```
###### در صفحه AllPostPage نیز می توانیم از MyPostPage کمک بگیریم و به صورت زیر آن را پیاده سازی کنیم.

```bash
<script lang="ts" setup>
import { ref } from 'vue';
import { columns, rows, pagination } from 'components/ts/AllPostComponent';
import AdminUpdatePost from 'components/vue/AdminUpdatePost.vue';
import AdminDeletePost from 'components/vue/AdminDeletePost.vue';

const filter = ref('');

const updatePostParameter = ref({
  modal: <boolean> false,
  id: <number>0,
  title: <string>'',
  description: <string>'',
});
const deletePostParameter = ref({
  modal: <boolean> false,
  id: <number>0,
  image: <string>'',
  title: <string>'',
  username: <string>'',
  description: <string>'',
});

const updatePost = (row: any) => {
  updatePostParameter.value.id = row.id;
  updatePostParameter.value.title = row.title;
  updatePostParameter.value.description = row.description;
  updatePostParameter.value.modal = !updatePostParameter.value.modal
};

const deletePost = (row: any) => {
  deletePostParameter.value.id = row.id;
  deletePostParameter.value.image = row.image;
  deletePostParameter.value.title = row.title;
  deletePostParameter.value.username = row.username.name;
  deletePostParameter.value.description = row.description;
  deletePostParameter.value.modal = !deletePostParameter.value.modal
};
</script>
```
###### باز مثل گذشته مواردی که مورد نیاز است را import می کنیم. چون نیاز به update و delete داریم. دو متغیر جهت ذخیره سازی آن می سازیم و دو تابع می خواهیم که این اعمال را پوشش دهد. دقت کنید که موقع جا گذاری مقدار نام کاربر باید به داخل object رفته و مقدار name را برداریم.

```bash
<template>
  <div class="q-pa-md q-mb-lg overflow-auto window-height">
    <q-table
      :grid="$q.screen.xs"
      title="All Posts"
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
              @click="updatePost(props.row)"
            />
            <q-btn
              class="q-ma-sm"
              size="md"
              color="red"
              dense
              icon="delete"
              @click="deletePost(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <AdminUpdatePost
  v-model:modal="updatePostParameter.modal"
  v-model:data="updatePostParameter"
  ></AdminUpdatePost>
  <AdminDeletePost
  v-model:modal="deletePostParameter.modal"
  v-model:data="deletePostParameter"
  ></AdminDeletePost>
</template>
```

###### در بخش template نیز مثل ساختار MyPostPage است. با این تفاوت که نام جدول باید تغییر کند و دکمه مربوط به ساخت پست نباید داشته باشد و نیز component مربوط به ساخت پست وجود ندارد.

