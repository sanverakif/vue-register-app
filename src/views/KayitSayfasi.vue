<template>
  <div class="mainDiv">
    <!-- <p id="_mail"></p> -->

    <br /><br />
    <div><img class="center" src="../assets/userIcon.png" /></div>
    <v-container>
      <v-row justify="space-between">
        <v-col>
          <!--form içerisinde bulunan datalar tetiklenme ile kayıt altına alınır.-->
          <v-form ref="form" id="forms" v-model="valid" lazy-validation>
            <!--değer girişleri için gereken inputlar-->

            <div @keyup="signUp">
              <tr>
                <td>
                  <v-text-field
                    v-model="kullaniciAdi"
                    style="width: 220px"
                    label="Kullanıcı Adı"
                    placeholder="abcd123"
                  ></v-text-field>
                </td>
                <td id="kullaniciAdiResult"></td>
              </tr>
              <tr>
                <td>
                  <!--İnputa girişin sağlanması için belirtilen şekilde girilmelidir ve bunun geçerli olması için ise required değerini kullanmamız gerekmektedir.:
              rules="mailRules"
                required
            -->
                  <v-text-field
                    style="width: 220px"
                    v-model="mail"
                    label="Mail"
                    placeholder="sa@gmail.com"
                  >
                  </v-text-field>
                </td>
                <td id="mailResult"></td>
              </tr>
              <tr>
                <td>
                  <!--sifre aynı olmalı-karakter kontrolu- 1 büyük 1 küçük dahil en az 8 karakter-şifre güçlüğü belirlenicek.-->
                  <v-text-field
                    label="Şifre"
                    placeholder="Ankara"
                    v-model="sifre"
                    style="width: 220px"
                  >
                  </v-text-field>
                </td>
                <password-meter :password="sifre" />
                <td><p id="sifre"></p></td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    style="width: 220px"
                    label="Şifre Tekrar"
                    placeholder="Ankara"
                    v-model="sifreTekrar"
                  ></v-text-field>
                </td>
                <password-meter :password="sifreTekrar" />
                <td>
                  <p id="sifreSonuc"></p>
                  <p id="sifreSonucResultText"></p>
                </td>
              </tr>
              <tr>
                <v-col>
                  <td style="float: left">
                    <!--Karakter sınırı: girilen değer 2.tekrarda aynı olmalıdır-->
                    <!-- <v-slider
                      v-model="rules"
                      :rules="kullaniciAdi"
                      label="How many?"
                      step="1"
                      style="width: 200px"
                      thumb-label="always"
                      ticks
                    ></v-slider> -->
                  </td>
                  <td style="float: right">
                    <!--şartlar sağlanırsa kayıt olunup başarılı mesajı gösterilsin.-->
                    <v-btn class="btnClick" type="submit" @click="signUp">
                      Kayıt ol
                    </v-btn>
                    <v-btn class="btnClear" @click="reset">Temizle</v-btn>
                  </td>
                </v-col>
              </tr>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import passwordMeter from "vue-simple-password-meter";
// import Password from "vue-password-strength-meter";
export default {
  //router temsil alanı
  name: "KayitSayfasi",
  components: { passwordMeter },
  data() {
    return {
      valid: true,
      //?? soru
      // sifreGuclugu : {
      //   cokKotu: "Çok kötü",
      // kotu: "Kötü",
      // orta: "Orta",
      // iyi: "İyi",
      // },
      cokKotu: "Çok kötü",
      kotu: "Kötü",
      orta: "Orta",
      iyi: "İyi",

      //data
      kullaniciAdi: "",
      mail: "",
      sifre: "",
      sifreTekrar: "",
      // value: 0,
      // rules: [(v) => v >= 8 || "8 harften az olamaz"],
      //valid-regex Müsterinin girdiği değerleri regex ile kontrol edip sifrenin gücünü müsteriye gösteriyoruz
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
        /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?.&])[A-Za-z\d@$!%*#?.&]{8,}$/,

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

      // sifreTekrarResultText: "Şifre tekrarı başarılı",
      // sifreTekrarResultText2: "Şifre tekrarı başarısız",

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

      // if (_kullaniciAdi != null && _kullaniciAdi.length >= 6) {
      if (_kullaniciAdi != null && _kullaniciAdi.length >= 8) {
        //text alanı
        console.log("Kullanıcı girişi başarılı");
        document.getElementById("kullaniciAdiResult").innerHTML =
          this.kullaniciAdiResultText;
      } else {
        document.getElementById("kullaniciAdiResult").innerHTML =
          this.kullaniciAdiResultTex2;
        return false;
      }
      if (_mail != null && _mailKural.test(_mail)) {
        //text alanı
        console.log("Mail girisi başarılı");
        document.getElementById("mailResult").innerHTML = this.mailResultText;
      } else {
        document.getElementById("mailResult").innerHTML = this.mailResultText2;
        return false;
      }
      // her farklı sorguda aynı field üzerinden boş mu kontrolu yapmak yerine tek seferde sorguyu kontrol edip butun if içerisine yayıyoruz
      if (_sifre != null) {
        if (_tooBadStrength.test(_sifre) || _tooBadStrength2.test(_sifre)) {
          console.log("Şifre gücünüz çok kötü");
          document.getElementById("sifre").innerHTML = this.cokKotu;
        } else if (_sifre != null && _badStrength.test(_sifre)) {
          console.log("Şifre gücünüz kötü");
          document.getElementById("sifre").innerHTML = this.kotu;
        } else if (_sifre != null && _midStrength.test(_sifre)) {
          console.log("Şifre gücünüz orta");
          document.getElementById("sifre").innerHTML = this.orta;
        } else if (_sifre != null && _goodStrength.test(_sifre)) {
          console.log("Şifre gücünüz iyi");
          document.getElementById("sifre").innerHTML = this.iyi;
        } else {
          document.getElementById("sifre").innerHTML = this.sifreResultText2;
          return false;
        }
      }

      if (_sifreTekrar != null) {
        if (
          (_sifreTekrar != null && _tooBadStrength.test(_sifreTekrar)) ||
          _tooBadStrength2.test(_sifreTekrar)
        ) {
          console.log("Şifre gücünüz çok kötü");
          document.getElementById("sifreSonuc").innerHTML = this.cokKotu;
        } else if (_sifreTekrar != null && _badStrength.test(_sifreTekrar)) {
          console.log("Şifre gücünüz kötü");
          document.getElementById("sifreSonuc").innerHTML = this.kotu;
        } else if (_sifreTekrar != null && _midStrength.test(_sifreTekrar)) {
          console.log("Şifre gücünüz orta");
          document.getElementById("sifreSonuc").innerHTML = this.orta;
        } else if (_sifreTekrar != null && _goodStrength.test(_sifreTekrar)) {
          console.log("Şifre gücünüz iyi");
          document.getElementById("sifreSonuc").innerHTML = this.iyi;
        } else {
          document.getElementById("sifreSonuc").innerHTML =
            this.sifreResultText2;
          return false;
        }
      }

      if (_sifre == _sifreTekrar) {
        //text alanı
        console.log("Şifreler eşleşti");

        document.getElementById("sifreSonucResultText").innerHTML =
          this.sifreSonucResultText;
      } else {
        document.getElementById("sifreSonucResultText").innerHTML =
          this.sifreSonucResultText2;
        return false;
      }
      // this.signUpClear();
      return false;
    },
    // signUpClear: function () {
    //   this.$refs.form.reset();
    //   // document.getElementById("forms").reset();
    // },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
body {
  background-color: lightblue;
}
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
  width: 550px;
  height: 540px;
}
img {
  border-radius: 50%;
}
.btnClick {
  background-color: lightblue;
  margin-right: 10px;
  width: 80px;
}
.btnClear {
  float: right;
  margin-right: -10px;
  width: 80px;
}
</style>
