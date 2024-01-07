import { ref } from 'vue';

const profileTemp = ref({
  modal: false,
  id: 0,
  username: 'hossein pourghadiri',
  email: 'hossein@gmail.com',
  avatar: '../../../public/images/avatar.png',
  newAvatar: undefined,
  password: '',
  role: 'user',
});

export {profileTemp}
