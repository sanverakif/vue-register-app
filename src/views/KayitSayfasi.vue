<template>
  <v-form>
    <div class="mainDiv">
      <!-- {{ c() }} -->
      <br /><br />
      <div><img class="center" src="../assets/userIcon.png" /></div>
      <v-container>
        <v-row justify="space-between">
          <v-col>
            <!--form içerisinde bulunan datalar tetiklenme ile kayıt altına alınır.-->
            <v-form ref="form" id="forms" @submit="signUp">
              <!--değer girişleri için gereken inputlar-->
              <v-text-field
                label="Kullanıcı Adı"
                placeholder="abcd123"
                id="kullaniciAdi"
                v-model="kullaniciAdi"
              ></v-text-field>

              <!--İnputa girişin sağlanması için belirtilen şekilde girilmelidir ve bunun geçerli olması için ise required değerini kullanmamız gerekmektedir.:
              rules="mailRules"
                required
            -->
              <v-text-field
                v-model="mail"
                label="Mail"
                placeholder="sa@gmail.com"
                id="mail"
              >
              </v-text-field>

              <!--sifre aynı olmalı-karakter kontrolu- 1 büyük 1 küçük dahil en az 8 karakter-şifre güçlüğü belirlenicek.-->
              <v-text-field label="Şifre" placeholder="Ankara" v-model="sifre">
                <!-- v-validate="{
                  required: true,
                  min: 8,
                  regex: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,}$/,
                  }" -->
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
                  <v-btn class="btnClick" type="submit"> Kayıt ol </v-btn>
                  <v-btn class="btnClear" @click="signUpClear">Temizle</v-btn>
                </td>
              </v-col>
            </v-form>
          </v-col>
        </v-row>
        <v-col>{{ sifreSonuc }}</v-col>
      </v-container>
    </div>
  </v-form>
</template>

<script>
export default {
  //router temsil alanı
  name: "KayitSayfasi",

  data() {
    return {
      // a: 5,

      mail: "",
      mailKural: /.+@.+\.com+/,
      mailRules: [
        //boş ve null olamaz? / != eşit değil !== tür ve değeri esit değil !=null değilse
        (v) => !!v || "E-mail is required",
        /*
        yazılan koşulların olup olmadığını kontrol eder
        https://erdincuzun.com/ileri-python/regular-expressions-duzenli-ifadeler/ 3.1.  = '.' karakteri isteniler karakterin harfini tutar öncesi ve sonrası 'sed.a.t' = seDaT
        */
        (v) => /.+@.+\.com+/.test(v) || "E-mail must be valid",
      ],
      kullaniciAdi: "",
      sifre: "",
      sifreTekrar: "",
      sifreKural: /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,}$/,
      karakterSinir: 0,
      sifreSonuc: "",
      // sifreKural: "^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$", // regex kullanımı bakılıyor
    };
  },
  methods: {
    // c() {
    //   if (!!this.a != 5) {
    //     console.log("+");
    //   }
    //   console.log("-");
    // },

    //form içerisinde 2 adet şifre girisi vardır Girilen değerler model aracılığı ile viewa gider

    signUp: function (
      _kullaniciAdi,
      _mail,
      _mailKural,
      _sifre,
      _sifreTekrar,
      _sifreKural
    ) {
      _kullaniciAdi = this.kullaniciAdi;
      _mail = this.mail;
      _mailKural = this.mailKural;
      _sifre = this.sifre;
      _sifreTekrar = this.sifreTekrar;
      _sifreKural = this.sifreKural;

      if (_kullaniciAdi != null) {
        //text alanı
        console.log("Kullanıcı girişi başarılı");
      }
      false;
      if (_mail != null && _mailKural.test(_mail)) {
        //text alanı
        console.log("Mail girişi başarılı");
      }
      false;
      if (_sifre != null && _sifreKural.test(_sifre)) {
        //text alanı
        console.log("Şifre girişi başarılı");
      }

      if (_sifreTekrar != null && _sifreKural.test(_sifreTekrar)) {
        //text alanı
        console.log("Şifre tekrarı başarılı");
      }
      if (_sifre == _sifreTekrar) {
        //text alanı
        console.log("Şifreler eşleşti");
        return true;
      }
      this.signUpClear();
      return false;
    },
    signUpClear: function () {
      this.$refs.form.reset();
    },

    // passWordLogin(_kullaniciAdi, _mail, _sifre, _sifreTekrar) {
    //   _kullaniciAdi = this.kullaniciAdi;
    //   _mail = this.mail;

    //   _sifre = this.sifreKural.test(this.sifre);
    //   _sifreTekrar = this.sifreKural.test(this.sifreTekrar);

    //   // _sifre = this.sifre;
    //   // _sifreTekrar = this.sifreTekrar;

    //   // this.sifreKural.test(_sifre);
    //   // this.sifreKural.test(_sifreTekrar);
    //   // _sifre(this.sifreKural);
    //   // _sifreTekrar(this.sifreKural);

    //   if (
    //     _kullaniciAdi != null &&
    //     // _mail(this.mailRules) !== true &&
    //     _sifre == _sifreTekrar &&
    //     _sifre != null &&
    //     _sifreTekrar != null
    //   ) {
    //     this.sifreSonuc = "Şifreler aynı";
    //     this.reset();
    //     return true;
    //   } else {
    //     this.sifreSonuc = "Geçersiz şifre";
    //     this.reset();
    //     return false;
    //   }

    //   // if (_sifre == _sifreTekrar && _sifre != null && _sifreTekrar != null) {
    //   //   this.sifreSonuc = "Şifreler aynı";
    //   //   this.reset();
    //   //   return true;
    //   // } else {
    //   //   this.sifreSonuc = "Geçersiz şifre";
    //   //   this.reset();
    //   //   return false;
    //   // }
    // },

    // reset() {
    //   /*getelementby id ve ref : document içerisindeki bir elemente veya idye ulaşmak istersek bunu $ref kullanarak da ulaşabiliriz
    //   asağıda iste bir kosul belirtmeden form içerisindeki istenilen elementlerin değerlirini temizledik*/
    //   this.$refs.form.reset();
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
btnClick {
  background-color: lightblue;
  float: right;
}
btnClear {
  margin-left: 5px;
}
</style>
