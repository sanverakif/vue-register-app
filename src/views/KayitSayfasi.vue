<template>
  <v-form>
    <p id="_mail"></p>
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
                style="width: 300px"
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
                style="width: 300px"
                v-model="mail"
                label="Mail"
                placeholder="sa@gmail.com"
              >
              </v-text-field>
              <p id="_mail"></p>

              <!--sifre aynı olmalı-karakter kontrolu- 1 büyük 1 küçük dahil en az 8 karakter-şifre güçlüğü belirlenicek.-->
              <v-text-field
                label="Şifre"
                placeholder="Ankara"
                v-model="sifre"
                style="width: 300px"
              >
              </v-text-field>
              <v-text-field
                style="width: 300px"
                label="Şifre Tekrar"
                placeholder="Ankara"
                v-model="sifreTekrar"
              ></v-text-field>
              <v-col>
                <td style="float: left">
                  <!--Karakter sınırı: girilen değer 2.tekrarda aynı olmalıdır-->
                  <v-slider
                    v-model="slider"
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
      sifreGucu: {
        cokKotu: "Çok kötü",
        kotu: "Kotu",
        orta: "Orta",
        iyi: "İyi",
      },
      //data
      kullaniciAdi: "",
      mail: "",
      sifre: "",
      sifreTekrar: "",
      counter: 0,

      //valid-regex
      mailKural: /.+@.+\.com+/,
      //Çok Kötü karakter güçlüğü: 8 karakter ve 1 küçük harf veye 1 büyük harf
      tooBadStrength: /(?=.*[a-z])[a-za-z]{8,}$/,
      tooBadStrength2: /(?=.*[A-Z])[A-ZA-Z]{8,}$/,
      //Kötü karakter güçlüğü: 8 karakter, 1 büyük ve 1 küçük harf
      badStrength: /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,}$/,
      //Orta karaktter güçlüğü: 8 karakter, 1 büyük 1 küçük 1 rakam
      midStrength: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      //İyi karakter güçlüğü: 1 büyük,1 küçük,1 sayı ve 1 özel karakter
      goodStrength:
        /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,

      // En az 8 karakter, 1 büyük ve 1 küçük harf
      sifreKural: /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,}$/,
      // En az 8 karakter, 1 büyük 1 küçük
      // sifreKural: "^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$", // regex kullanımı bakılıyor

      //labelResult// musterinin yanlış girdiği değerlere karşın hata metini yazdırıp uyarıyoruz
      kullaniciAdiResultText: "Kullanıcı girişi başarılı",
      kullaniciAdiResultTex2: "Kullanıcı girişi başarısız",

      mailResultText: "Mail girişi başarılı",
      mailResultText2: "Mail girişi başarısız",

      sifreResultText: "Şifre girişi başarılı",
      sifreResultText2: "Şifre girişi başarısız",

      sifreTekrarResultText: "Şifre tekrarı başarılı",
      sifreTekrarResultText2: "Şifre tekrarı başarısız",

      sifreSonucResultText: "Şifreler eşleşti",
      sifreSonucResultText2: "Şifreler eşleşleşmedi",
    };
  },
  methods: {
    /*fieldalarımızı oluşturarak metot veya bir fonksiyon içerisinde tanımlı olan fielda dataya ulaşıp işlemlerimizi yapabiliriz.
      buradaki amaç her istek olduğunda ram a defalarca örneğini çıkarmak kopyasını almak yerine 1 kez çıkartıp işlem yapmamızı sağlar
      bunda bağımlılıktan kurtulmuş oluruz buna DIP deriz. Dependency injection. */

    signUp: function (
      _kullaniciAdi,
      _mail,
      _mailKural,
      _sifre,
      _sifreTekrar,
      _sifreKural,
      _tooBadStrength,
      _tooBadStrength2,
      _badStrength,
      _midStrength,
      _goodStrength
    ) {
      _kullaniciAdi = this.kullaniciAdi;
      _mail = this.mail;
      _mailKural = this.mailKural;
      _sifre = this.sifre;
      _sifreTekrar = this.sifreTekrar;
      _sifreKural = this.sifreKural;
      _tooBadStrength = this.tooBadStrength;
      _tooBadStrength2 = this.tooBadStrength2;
      _badStrength = this.badStrength;
      _midStrength = this.midStrength;
      _goodStrength = this.goodStrength;

      if (_kullaniciAdi != null) {
        //text alanı
        console.log("Kullanıcı girişi başarılı");
        document.getElementById("_mail").innerHTML =
          this.kullaniciAdiResultText;
      } else {
        document.getElementById("_mail").innerHTML =
          this.kullaniciAdiResultTex2;
        return false;
      }
      if (_mail != null && _mailKural.test(_mail)) {
        //text alanı
        console.log("Mail girisi başarılı");
        document.getElementById("_mail").innerHTML = this.mailResultText;
      } else {
        document.getElementById("_mail").innerHTML = this.mailResultText2;
        return false;
      }

      if (_sifre != null) {
        if (_tooBadStrength.test(_sifre) || _tooBadStrength2.test(_sifre)) {
          console.log("Şifre gücünüz çok kötü");
          document.getElementById("_mail").innerHTML = this.sifreGucu.cokKotu;
        } else if (_sifre != null && _badStrength.test(_sifre)) {
          console.log("Şifre gücünüz kötü");
          document.getElementById("_mail").innerHTML = this.sifreGucu.kotu;
        } else if (_sifre != null && _midStrength.test(_sifre)) {
          console.log("Şifre gücünüz orta");
          document.getElementById("_mail").innerHTML = this.sifreGucu.orta;
        } else if (_sifre != null && _goodStrength.test(_sifre)) {
          console.log("Şifre gücünüz iyi");
          document.getElementById("_mail").innerHTML = this.sifreGucu.iyi;
        } else {
          document.getElementById("_mail").innerHTML = this.sifreResultText2;
          return false;
        }
      }

      if (_sifreTekrar != null) {
        if (
          (_sifreTekrar != null && _tooBadStrength.test(_sifreTekrar)) ||
          _tooBadStrength2.test(_sifreTekrar)
        ) {
          console.log("Şifre gücünüz çok kötü");
          document.getElementById("_mail").innerHTML = this.sifreGucu.cokKotu;
        } else if (_sifreTekrar != null && _badStrength.test(_sifreTekrar)) {
          console.log("Şifre gücünüz kötü");
          document.getElementById("_mail").innerHTML = this.sifreGucu.kotu;
        } else if (_sifreTekrar != null && _midStrength.test(_sifreTekrar)) {
          console.log("Şifre gücünüz orta");
          document.getElementById("_mail").innerHTML = this.sifreGucu.orta;
        } else if (_sifreTekrar != null && _goodStrength.test(_sifreTekrar)) {
          console.log("Şifre gücünüz iyi");
          document.getElementById("_mail").innerHTML = this.sifreGucu.iyi;
        } else {
          document.getElementById("_mail").innerHTML = this.sifreResultText2;
          return false;
        }
      }

      if (_sifre == _sifreTekrar) {
        //text alanı
        console.log("Şifreler eşleşti");
        document.getElementById("_mail").innerHTML = this.sifreSonucResultText;
      } else {
        document.getElementById("_mail").innerHTML = this.sifreSonucResultText2;
        return false;
      }
      this.signUpClear();
      return false;
    },
    signUpClear: function () {
      this.$refs.form.reset();
    },
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
  width: 450px;
  height: 540px;
}
img {
  border-radius: 50%;
}
.btnClick {
  background-color: lightblue;
  margin-right: 10px;
}
.btnClear {
  float: right;
  margin-right: -10px;
  background-color: red;
}
</style>
