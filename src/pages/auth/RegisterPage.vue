<template>
  <q-page-container>
    <q-page class="window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <h5 class="text-h5 text-white q-my-md">Register To Open World</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg w-400">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  v-model="registerParameters.name"
                  square
                  filled
                  clearable
                  type="text"
                  label="First Name and Last Name"
                />
                <q-input
                  v-model="registerParameters.email"
                  square
                  filled
                  clearable
                  type="email"
                  label="Email"
                />
                <q-input
                  v-model="registerParameters.password"
                  square
                  filled
                  clearable
                  type="password"
                  label="Password"
                />
                <q-file
                  v-model="registerParameters.avatar"
                  ref="avatarState"
                  filled
                  bottom-slots
                  label="Avatar"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop.prevent />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop.prevent="registerParameters.avatar = null"
                      class="cursor-pointer"
                    />
                  </template>

                  <template v-slot:hint> File Size </template>
                </q-file>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                @click="register()"
                unelevated
                color="light-blue-8"
                size="lg"
                class="full-width q-ma-sm"
                label="Register"
              />
              <q-btn
                @click="login()"
                unelevated
                color="red"
                size="lg"
                class="full-width"
                label="login"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none"> </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const registerParameters = ref({
  name: '',
  email: '',
  password: '',
  avatar: [],
});
const register = () => {
  console.log(
    registerParameters.value.name,
    registerParameters.value.email,
    registerParameters.value.password,
    registerParameters.value.avatar
  );
};

const router = useRouter();
const login = () => {
  router.replace({ name: 'login' });
};
</script>
