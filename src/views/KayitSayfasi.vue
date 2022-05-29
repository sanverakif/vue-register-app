<template>
  <div class="mainDiv">
    <br /><br />
    <div><img class="center" src="../assets/userIcon.png" /></div>
    <v-container>
      <v-row justify="space-between">
        <v-col>
          <!--form içerisinde bulunan datalar tetiklenme ile kayıt altına alınır.-->
          <v-form ref="form" id="forms">
            <!--değer girişleri için gereken inputlar-->
            <v-text-field
              label="Kullanıcı Adı"
              placeholder="abcd123"
              id="kullaniciAdi"
              v-model="kullaniciAdi"
            ></v-text-field>

            <!--İnputa girişin sağlanması için belirtilen şekilde girilmelidir ve bunun geçerli olması için ise required değerini kullanmamız gerekmektedir
            
            
            -->

            <v-text-field
              v-model="mail"
              label="Mail"
              placeholder="sa@gmail.com"
              id="mail"
              :rules="mailRules"
              required
            >
            </v-text-field>

            <!--sifre aynı olmalı-karakter kontrolu- 1 büyük 1 küçük dahil en az 8 karakter-şifre güçlüğü belirlenicek.-->
            <v-text-field label="Şifre" placeholder="Ankara" v-model="sifre">
            </v-text-field>
            <v-text-field
              label="Şifre Tekrar"
              placeholder="Ankara"
              v-model="sifreTekrar"
            ></v-text-field>
            <v-col>
              <td style="float: left">
                <!--Karakter sınırı: girilen değer 2.tekrarda aynı olmalıdır-->
                <v-slider
                  label="Max characters"
                  style="width: 200px"
                ></v-slider>
              </td>
              <td style="float: right">
                <!--şartlar sağlanırsa kayıt olunup başarılı mesajı gösterilsin.-->
                <v-btn
                  style="background-color: lightblue; float: right"
                  @click="passWordLogin"
                  >Kayıt ol</v-btn
                >
              </td>
               
            </v-col>
          
          </v-form>
        </v-col>
      </v-row>
       <v-col>{{ sifreSonuc }}</v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  //router temsil alanı
  name: "KayitSayfasi",

  data() {
    return {
      mail: "",
      mailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      kullaniciAdi: "",
      kullanici: [],
      sifre: "",
      sifreTekrar: "",
      karakterSinir: 0,
      sifreSonuc: "",
      sifreKural: "^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$", // regex kullanımı bakılıyor
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

      if (sifre == sifreTekrar && sifre != null && sifreTekrar != null) {
        this.sifreSonuc = "Şifreler aynı";
        this.reset();
        return true;
      } else {
        this.sifreSonuc = "Geçersiz şifre";
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

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}
.mainDiv {
  margin-left: auto;
  margin-right: auto;
  background-color: darkseagreen;
  width: 400px;
  height: 520px;
}
img {
  border-radius: 50%;
}
</style>
