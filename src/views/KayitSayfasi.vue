<template>
  <v-container>
    <v-row justify="space-between">
      <v-col>
        <!--form içerisinde bulunan datalar tetiklenme ile kayıt altına alınır.-->
        <v-form ref="form" id="forms">
          <!--değer girişleri için gereken inputlar-->
          <v-text-field
            label="Kullanıcı Adı"
            id="kullaniciAdi"
            v-model="kullaniciAdi"
          ></v-text-field>

          <!--sifre aynı olmalı-karakter kontrolu- 1 büyük 1 küçük dahil en az 8 karakter-şifre güçlüğü belirlenicek.-->
          <v-text-field label="Şifre" v-model="sifre"> </v-text-field>
          <v-text-field
            label="Şifre Tekrar"
            v-model="sifreTekrar"
          ></v-text-field>

          <v-col>
            <!--şartlar sağlanırsa kayıt olunup başarılı mesajı gösterilsin.-->
            <v-btn
              style="background-color: lightblue; float: right"
              @click="passWordLogin"
              >Kayıt ol</v-btn
            >
          </v-col>
        </v-form>
      </v-col>
      <!--Karakter sınırı: girilen değer 2.tekrarda aynı olmalıdır-->
      <v-col cols="12" md="8" style="margin-top: 30px">
        <v-slider label="Max characters"></v-slider>
        <v-col style="margin-top: 70px">{{ sifreSonuc }}</v-col>
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
      kullanici: [],
      sifre: "",
      sifreTekrar: "",
      karakterSinir: 0,
      sifreSonuc: "",
      sifreKural: "^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$",
    };
  },
  methods: {
    // signUp(name) {
    //   // this.kullaniciAdi = document.getElementById("kullaniciAdi");
    //   name = this.kullaniciAdi;
    //   return alert(name);
    // },

    userNameLogin(name) {
      name = this.kullaniciAdi;
      return alert(name);
    },
    //form içerisinde 2 adet şifre girisi vardır Girilen değerler model aracılığı ile viewa gider
    passWordLogin(sifre, sifreTekrar) {
      sifre = this.sifre;
      sifreTekrar = this.sifreTekrar;

      // if (sifre == this.sifreKural && sifreTekrar == this.sifreKural) {
      //   if (sifre == sifreTekrar) {
      //     this.sifre = "Sifreler aynı";
      //     this.reset();
      //     return true;
      //   } else {
      //     this.sifre = "Sifreler aynı değil";
      //     this.reset();
      //     return false;
      //   }
      // } else {
      //   alert("değerler eşleşmiyor");
      // }

      // if (sifre == ['a-z']) {

      // }

      if (sifre == sifreTekrar) {
        this.sifreSonuc = "sifreler aynı";
        this.reset();
        return true;
      } else {
        this.sifreSonuc = "sifreler aynı değil";
        this.reset();
        return false;
      }
    },
    reset() {
      /*getelementby id ve ref : document içerisindeki bir elemente veya idye ulaşmak istersek bunu $ref kullanarak da ulaşabiliriz
      asağıda iste bir kosul belirtmeden form içerisindeki istenilen elementlerin değerlirini temizledik*/
      this.$refs.form.reset();
    },

    // clearForm() {
    //   this.kullaniciAdi = "";
    //   this.sifre = "";
    //   this.sifreTekrar = "";
    //   this.sifreSonuc.clear();
    // },
  },
};
</script>
