<template>
  <q-layout view="hHh LpR fFf" class="auth-background">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../../../public/images/logo.png">
          </q-avatar>
          Menu
        </q-toolbar-title>
        <span>Profile</span>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- drawer content -->
      <q-list separator>
        <q-item
          v-for="(item, index) in accessMenu"
          :key="index"
          :to="{ name: item.route }"
          v-ripple
          clickable
        >
          <q-avatar><q-icon :name="item.icon"></q-icon></q-avatar>
          <q-item-section>
            <q-item-label class="q-ml-sm"> {{ item.name }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated>
      <!-- drawer content -->
      <div class="avatarBox row items-center justify-center">
        <q-avatar size="150px" class="overlapping">
          <q-img :src="profileTemp.avatar"></q-img>
        </q-avatar>
      </div>
      <div class="q-pa-md row items-start q-gutter-md justify-center">
        <q-card flat bordered class="my-card text-center">
          <q-card-section>
            <div class="text-h3">Profile</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section class="q-pt-none">
            <div class="text-h6">User Name</div>
            {{ profileTemp.username }}
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-pt-none">
            <div class="text-h6">E-Mail</div>
            {{ profileTemp.email }}
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pa-md q-gutter-sm text-center">
        <q-btn
          class="full-width"
          label="Update"
          color="light-blue-8"
          @click="profileTemp.modal = true"
        />
        <q-btn class="full-width" label="Logout" color="red" @click="logout()" />

        <q-dialog v-model="profileTemp.modal" persistent>
          <q-card style="width: 350px">
            <q-card-section>
              <div class="text-h6">Update Profile</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="profileTemp.username"
                label="Your User Name"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="profileTemp.email"
                label="Your E-Mail"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                v-model="profileTemp.password"
                dense
                label="Your Password"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-file
                filled
                bottom-slots
                v-model="profileTemp.newAvatar"
                label="Label"
                counter
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="profileTemp.newAvatar = null"
                    class="cursor-pointer"
                  />
                </template>

                <template v-slot:hint> File Size </template>
              </q-file>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Submit" @click="update()" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { accessMenu } from 'components/ts/MenuComponent'
import { profileTemp } from 'components/ts/ProfileComponent'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      accessMenu,
      profileTemp,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      update(){
        console.log(
          'update'
        );
        profileTemp.value.modal = !profileTemp.value.modal
      },
      logout(){
        console.log('logout');
      }
    }
  }
}
</script>
