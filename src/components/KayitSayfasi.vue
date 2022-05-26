<template>
  <v-container>
    <v-row justify="space-between">
      <v-col>
        <!--form içerisinde bulunan datalar tetiklenme ile kayıt altına alınır-->
        <v-form ref="form">
        <!--değer girişleri için gereken inputlar-->
          <v-text-field label="Kullanıcı Adı"></v-text-field>

        <!--sifre aynı olmalı-karakter kontrolu- 1 büyük 1 küçük dahil en az 8 karakter-şifre güçlüğü belirlenicek-->
          <v-text-field label="Şifre"></v-text-field>
          <v-text-field label="Şifre Tekrar"></v-text-field>

          <v-col>
            <!--şartlar sağlanırsa kayıt olunup başarılı mesajı gösterilsin-->
            <v-btn style="background-color: lightblue; float: right"
              >Kayıt ol</v-btn
            ></v-col
          >
        </v-form>
      </v-col>
    <!--Karakter sınırı: girilen değer 2.tekrarda aynı olmalıdır-->
      <v-col cols="12" md="8" style="margin-top: 30px">
        <v-slider label="Max characters"></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //router temsil alanı
  name: "KayitSayfasi",

  data() {
    return {
      kullaniciAdi: "",
      sifre: "",
      karakterSinir: 0,
    };
  },
  computed: {},
  methods: {},
};
</script>
