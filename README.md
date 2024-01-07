# ساخت prototype بخش مدیریت پست های هر شخص با امکانات کامل آن


###### برای ساخت فاز اولیه پست های هر شخص شروع به ساخت component های مورد نظر می کنیم و سپس یک الگو جدول از <a href="https://quasar.dev/vue-components/table/">Quasar Table</a> انتخاب و استفاده می کنیم.

###### برای اینکه داده های جدول را لیست کنیم، فایلی از نوع ts در component می سازیم و نام آن را MyPostComponent می گذاریم و قطعه کد زیر را در آن می نویسیم.

```bash
import { ref } from 'vue';

const columns: any[] = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
  { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true,format: (val:string) => `${val.slice(0,40)} ...`, },
]

const rows = ref([
  {
    id: 1,
    image: 'images/mountains.jpg',
    title: 'fake',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available'
  },
  {
    id: 2,
    image: 'images/mountains.jpg',
    title: 'fake',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available'
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
###### در این component سه متغیر نیز ساخته می شود که مورد استفاده قرار می گیرد. برای بخش ستون های جدول و داده های آن، متغیر columns را می سازیم. برای بخش داده های هر ردیف، متغیر rows را می سازیم و برای مبحث صفحه بندی جدول، متغیر pagination را می سازیم.

###### برای اینکه در صفحه خود برای بحث ساخت پست و ویرایش و حذف آن یک dialog box باز کنیم، یک component برای هر کدام می سازیم. بنا بر این در پوشه component یکی پوشه vue می سازیم.

###### برای ساخت پست یک فایل vue به نام UserCreatePost می سازیم. بخش script آن را به صورت زیر می نویسیم.

```bash
<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  modal: {
    default: false,
  }
});

const createPostParameter = ref({
  title: '',
  description: '',
  image: undefined,
});

const emit = defineEmits(['update:modal']);

const close = () => {
  emit.call(this, 'update:modal', false);
};

const accepted = () => {
  console.log(
    createPostParameter.value.title,
    createPostParameter.value.description,
    createPostParameter.value.image
  );

  emit.call(this, 'update:modal', false);
};
</script>
```

###### برای اینکه این component را بنویسیم نیاز به defineProps و defineEmits و ref داریم، به همین دلیل از کتاب خانه vue آن را import می کنیم. یک property برای این component خود می سازیم که نام آن را props می گذاریم. برای اینکه متوجه شویم props چه نقشی در component ما دارد، در واقع مانند یک attribute تگ عمل می کند که در اضائه پر شدن، یک رفتار را نشان می دهد. در این component ما فقط نیاز به بحث modal داریم که در اضائه true یا false شدن آن component باز یا بسته شود.

###### یک متغیر می سازیم تا داده های وارد شده کاربر را نگه داریم و نام آن را createPostParameter می گذاریم.

###### یک emit نیز تعریف می کنیم که بتوانیم modal را تغییر دهیم. یک نکته ای که وجود دارد این است که وقتی component دستور باز شدن صادر  می شود. این دستور از بیرون component است، حال اگر بخواهیم از داخل component مقدار modal را عوض کنیم به گونه ای که در لایه بالا هم ویرایش شود، از emit استفاده می کنیم.

###### برای بخش template نیز از <a href="https://quasar.dev/vue-components/dialog/">Quasar Dialog</a> یک dialog مناسب خود را بر می داریم و استفاده می کنیم. کد آن را به صورت زیر می نویسیم.

```bash
<template>
  <q-dialog :model-value="props.modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New Post</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model:model-value="createPostParameter.title"
          label="Enter Your Title"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          type="textarea"
          dense
          v-model:model-value="createPostParameter.description"
          label="Enter Your Description"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file
          filled
          bottom-slots
          v-model:model-value="createPostParameter.image"
          label="Post Image"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="createPostParameter.image = null"
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
```

###### در dialog خود با استفاده از <a href="https://quasar.dev/vue-components/input/">Quasar Input</a> موارد مورد نظر خود را برداشته و فرم خود را می سازیم.


###### برای ویرایش پست خود فایل UserUpdatePost در پوشه vue می سازیم و برای کار خود می توانیم از الگو ساخت پست استفاده کنیم. فقط کمی تغییر نیاز دارد. در بخش script آن به صورت زیر عمل می کنیم.

```bash
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
###### در props آن یک data اضافه می کنیم و از کتاب خانه vue نیز watch را اضافه می کنیم. watch برای این است که در component خود داده های اولیه را دریافت که کردیم، در اضائه تغییر در لایه بالا تر، نیز در component داده ها را عوض کنیم. در بخش template آن هم به صورت زیر عمل می کنیم.

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
```

###### در بخش template نیز از همان الگو زیر استفاده می کنیم و تغییر چندانی ندارد. فقط نام متغیر آن عوض می شود.

###### برای حذف کردن پست نیز یک فایل از نوع vue به نام UserDeletePost می سازیم و در بخش script آن به صورت زیر می نویسیم.

```bash
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
###### باز هم defineProps و defineEmits و ref را از کتاب خانه vue به کد خود import می کنیم. در props خود مقدار modal و data را آماده دریافت قرار می دهیم. برای اینکه در آینده بخواهیم هم عکس و هم موقعیت  جغرافیایی را نمایش دهیم، از بخش <a href="https://quasar.dev/vue-components/tabs/">Quasar Tabs</a> الگو مورد نظر خود را انتخاب می کنیم و متغیر tab و تابع changeTab را برای آن می سازیم.

###### در بخش template هم به صورت زیر می نویسیم.

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
```
###### در این بخش از همان اگو صفحه index استفاده می کنیم، با این تفاوت که بجای نمایش عادی تصویر از q-tab-panels استفاده می کنیم.

###### در صفحه MyPostPage خود نیز، بخش template را به صورت زیر می نویسیم.

```bash
<script lang="ts" setup>
import { ref } from 'vue';
import { columns, rows, pagination } from 'components/ts/MyPostComponent';
import UserCreatePost from 'components/vue/UserCreatePost.vue';
import UserUpdatePost from 'components/vue/UserUpdatePost.vue';
import UserDeletePost from 'components/vue/UserDeletePost.vue';

const filter = ref('');

const createPostParameter = ref({
  modal: <boolean> false,
});
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

const createPost = () => {
  createPostParameter.value.modal = !createPostParameter.value.modal
};

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
  deletePostParameter.value.username = 'hossein';
  deletePostParameter.value.description = row.description;
  deletePostParameter.value.modal = !deletePostParameter.value.modal
};
</script>
```
###### در بخش script برای خروجی خود نیاز به component های ساخته شده و نیز ref داریم، پس آن ها را import می کنیم. برای جدول خود نیز یک متغیر filter می سازیم که در اثر نوشتن بتوانیم به آن دسترسی داشته باشیم و سه متغیر برای نگه داشتن داده های مورد نیاز برای حالت های create و update و delete می سازیم و همچنین تابع هایی برای شرایط create و update و delete می سازیم. برای ساخت جدول، از Quasar Table مدلی که انتخاب کرده بودیم را بر می داریم و در بخش template خود می گذاریم.

```bash
<template>
  <div class="q-pa-md q-mb-lg overflow-auto window-height">
    <q-table
      :grid="$q.screen.xs"
      title="My Posts"
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
          label="Create New Post"
          color="light-blue-8"
          class="q-ml-md"
          @click="createPost()"
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
  <UserCreatePost
  v-model:modal="createPostParameter.modal"
  ></UserCreatePost>
  <UserUpdatePost
  v-model:modal="updatePostParameter.modal"
  v-model:data="updatePostParameter"
  ></UserUpdatePost>
  <UserDeletePost
  v-model:modal="deletePostParameter.modal"
  v-model:data="deletePostParameter"
  ></UserDeletePost>
</template>
```

###### کمی تغییر بر روی جدول به وجود می آوریم. جدول را به متغیر pagination متصل می کنیم و در هر دور نمایش ردیف، به صورت دستی  دو q-btn را می سازیم، تا بتوان از طریق component های مورد نظر را اجرا کرد. دقت کنید که باید component ها را بعد از تمام شدن جدول بگذارید.
