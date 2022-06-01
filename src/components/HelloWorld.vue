<template>
  <div>
    <!--Router kullanarak sayfalar arası yönlendirme yapıldı, kullanıldı-->
    <router-link :to="{ name: 'KayitSayfasi' }">Kayıt sayfasına gider</router-link>
    <!-- <router-link :to="{ name: 'RegisterView' }">Kayıt sayfasına gider</router-link> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorlds",
};
</script>
