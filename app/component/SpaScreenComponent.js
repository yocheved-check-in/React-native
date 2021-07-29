import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import colors from "../config/colors";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";

function SpaScreenComponent({ title, FlatListData, viewOnPress, onCardPress }) {
  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => onCardPress(item)}>
        <Card containerStyle={styles.cardContainer}>
          <Image
            style={styles.cardImage}
            source={{
              uri:
                item.image == null
                  ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRFRgVEhUYEhgYGhgYGBgaGBgYGBgYGBgaHBkZGBgdIS4lHB4rIRgYJjgmKy8xNTU1HCQ7QDszPy40NTEBDAwMEA8QHBISHjQhJSU0NDQ0NDQ0NDQ0MTQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ1NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwEEBQAGB//EAD0QAAIBAgQEAwYDBgYCAwAAAAECAAMRBBIhMQVBUWFxgZEGEyIyobFSwdEUQoKS4fBDYnKisvEVwgcWI//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBv/EACIRAQEAAgEEAwEBAQAAAAAAAAABAhEhAxIxUQRBYSKRFP/aAAwDAQACEQMRAD8A+pvtEmOfaIMBiQm3gpCaAUWYyKgNWDUhLBqSgBCbaADDbaAkzlnGcsgYILQhBaVACNSLEaksENIhNBkDFEMQVEIQFtF2jWi4B04xoFOMaAu0iFIhTEnPJSQ8IAyFhGQsKaIMMQDCOMGEZEKmdJnQhb7RBjn2iTIo6cJoKQmgFFw4HOA1YDw1i3lArDbaAsJ4CDCWCYSwGCC0IQWgAI5IoCOWWDmgwmkSBiwhIWTFQDRca0XCjpw2g04TQBkSZ0BiSGElZzQAMhYRkLAYIJhwDA4wSIUiBM6TOhCW2iTHNtK8impCaAkJzAkQOcIQYDVi6kYsU5lELCeAphPAUZKwTJSA4SGkrIaAMcsTHLLBzQYTSJAwSZAkwBaLjGgQGJCaCkMwAnSTIgMQSGkrIaALSFkmQIDYMIQTCIMgwoMKKdJnS6RXO0SY47RBmVMSS8FJLmBIg84Qgc5Q1YqpGLF1IELCcwFkuYEUqee+trayVXvDwO58B949rShbJaA0dVOgiGkERyxAjllgloIksZEgaJIgiEIAmDaMC9dJWxWKCaWO8aDg4G5tDzg8xMN8WDzvcggdtdSPSUsbXZCSdb3sNbjvp6+EuoPUmRPKUeKVFuc9wACBuCOe/TpLFPj99z6WjtR6dZDTCo8ft8wzjtv/AFmhT4tScXVvpGqLZkCV/wBtpnYwlxNM/vCTSrYgmcjq2xB85DsBvpqB5naETBhQYBzp06UVjtEGOO0QZlTKcJ4NOS8okGBzhAwL6wGiKqGNETUgcklzAQyahgOwG7eEJnsRCwAspPUxFZ9ZYh7mAqZjaCrXEbhvm8jIpbJlNrxiiRXNj1nK8qIaROaRIpohqItYwjTUXgVcZicgNzy0nl+J8RLaDv8ArvNHjFa23naeWqocxJ0t9+kxlb4jeMnmrVJqh1BtsbDU7zboujgZtDfY+h1nlcPj2R+q3uRPRYSsrnQeFxy6jrGGUs4aymnYzC2+EBRa+pG99St+uuhmRXAGUqMqnTzE9cFDixGv3HbvMrjmEsAVHbzt99J1lcmKDcDXX6yPeEG4NiOcmgvXl2hOnbxlQ1MU3U+slcSw3JlFny+EYjA6ehjYsJxFlfKrEMFDd7EkflL9b2gYGilQizVqYLdhc6+gnjWxQGPCk6MgT1GYfX7yzxt7V8Mg/HmPqoH/ALTjc9y/l0m+K+sq6m1iDfbv4Tp47hXESMXSolvhyVWA7koB9mnsZrfNWDnSJ00KpOkQTHHaVyZlTqcJoNOE0ogQBvCEAbwHjaIqR3KIqQIWdUMhZGIfKpNr21tJbok2vYL5PMyniTrPL4n/AORcJQJT3NUkX2yW365pp8D9pKeOLCnTdAouS+XrYDQnv6SY543iVq9PKTdjZpnSPwx+LylfIeUtpQy/Ex8uU2wTid5ynaKxGJtKvvmPOUWTiO33/SPpuCh2v4/0lPPYC4hJW7i3S35zNlamllKsdXcgXttf/uV0qjtLLtdfKVHmcTdmJ639Zj4umCWuSttuQvoLA9ZrYm6vr1isbRDgADRjqTsTymZG3nsJTu5DDy7EHaaQrFWDLbkRY6AdPpBr4R0N1HxZTcjsRa/kJboYHOtzoDY2HIXta/rEx1NFyehom6hgND9JHFqauhHkPG8Zh6YCqq6BbeUDiFVQNZth5Ij4iTrbS/W05r33tJbc9/vOC894KzOK4n3WpRmU7lbG1u3SVcBxyg2mcKeWbT67S/xQpku2g8/ynjsSmGc3LZT1UEjzFrGcs8rjeGbdLftMhpYmnVGzZGB7o2v0yy/ianvOIoOSAX7ZULk/7p5yuudPdriEdQbqHDJlNj8pIsL32vaWMRiLNiKwN87e6RhqCGGZyD/pVR/HONy3u/u2XqfZ7Fmvia2IHyoERP8ATmJ+tr+c+qqbgHtPmPAqKYTDBqpFMt8bk9W2XxtbSey4BjamLtWKmnRUZaSn5nJHxVGHIW0UdCTzFu2PEkvm8tThvzp06dFVOUrGPG0rmZU6mYxoqnGPKABgrvJvBU6wLF5WqR95WqQJQxvug6sNyVOlwNOWpikMfR2f/SY1sfCPaKmwxLIVC2Y/KQfrafUPYDh606BaxBci5Yg6Lta3LUzbxPBsKQpfD0mNtzTQnbqRLVGkqJZFCKNgoAA8hOePT7bt2y6u8dLCDURGPxJBIvHU2uRM/jC2N+s6bcYptVJMuYYTOpzTw4sJSixpsnmJSD6CPx7fB5iTS4Y5tmIXtuZVhaVJewlXMCvmIylh6aD8Xc2P/UfTqpyA8rQjF4jQ/OV6LIVKnXmb208ps45Aw0nnsRSy7DQ6eBmLw1jys1KCn4tdNN9fCMo0bkEEAWtfy184rC4pbWa/Ia8tNY+o24vv94mS3FZWstMBQbnn3mNxDF5rjn9rHS0c72BI31F+2m0ysQjE/Ct/p6RsmOgM/wDf5SAdTFjOOXO28is5Q2YWmozVfiQupt0nlMRw3Ofnse4v/WenxKM+zAzJqYVlIJN+pvsOtpzzx7vKa2y19mqtwQ9PqLk/8cpvNelwhro2IdCiEuERMoLHLvyt8IO0ecVTpi4IJ6/1mLjeMq5sHLHbKt2P0mJjjPDc6Unlo8Sq061QZs1Sx2LfCOwUaW+s+qezyKMNSykm65iTuWYksfW9u1p8bwDIDmqZlHQKSx8zoPUz2OH9uCgVET4VAAFgNB59JvGTezLGfT6POnkqft5QsM1Nwedip/ORN7jGq3wdIkxinSKMgbTjGiqca0oXAB1kkwVOsB8RUjrxDwCpAk6SxTolFZmIudOeij+/rK+GqIDZ2C36m2kfj8ZTsQrqbqx0YHoJjvx358LqgYlt9O1z0BnUybZfr4eMUK65tSPmbn4Qg4YaEE2Gx100jux9mqsUtGHMShxa97yylTK2ptyHjJq0BUN22H11jezwx6ImpRW9gJJRRoFAF+ksUVUfF5TUKPKqC/P+9pUxGOtzt9YjG4hrkDS0x8RWPOTLLTWOO2hUxpOgY2nYd7Xsdet95hLirmw1mlgSCdN7X62tMzK2t3GSND35Fyeu3bnKlbFLbrfny5S3QGa9htzlLH4YC9tB57k8vWW26TGTalVfrZbn1P6y5geHBxne5/CMxt46GUeF8P8AePnckhCLDq3L00nojUChhfbS/S9rzOM3zWsrriKTIAbCw+lv1iCiA7XY/Kx2isTjFQk/vbDsOsza+GbEkZy6qNgCRm76ay3P0Y4+2ooBI+vS+txIx2EFQWttsdtfGLp4O6ldu+239maeFS62OtgAPKaxtZykeJ4hQei3wwMPi1qaNYNPT8XwQe5Fx1Fr6dfHnPnfEQ1NrjkdeU1bpnt29HjOHYdEzVERj0yi3n1mDWxmXSmoUcgoAH0lzB0a2JW6tmHUroPO4lfFez+KHzVadMdkYn1JnPmunEUWru25tCRwNzFvwN/3sST4ACHhuHCmbh85/wAwVvuI1U3Fj36zpp08dVAAuP5V/SdLpnb6WraRBqaxJxDgarKr1G6TfczqtWnUji0xFxTLyjP/ACTfhjZpou8Wr6zKqY89JCY1ukmztrdDRLtKI4ibbRL4/tLs7as1RdvIfcyvUw6E6op15gfhaMw1XPrtyh5bsANywA81afEfPtvy85Pb19PjGKeC4TTqn5FCrkLGw2y7DveapRKa5KahB25nqTzMu+7FJAg1sACepA1MzMTUtefTfC+LOh0/65t8304Z53K/gPe95pUsTmHgB9phZzLuAc5rHmLfpPX3arNx4FisVlYCalFbIvhc+cyGwpqVh+Fdzym281hbbazl4iniEvMPiNLe03MSTymPid7bzWXMMfKhhqQW7Hn/AFGn0lvBPd7KNLa9Bba5ld19BH4AAEkjU9LXt+m05436drOHpMEgFNmHO303lLGUwRfqDJXFXpMig6g+QMayXQA72E1LvbOtE8Po2S/Ntf8Avw/KZvFMVYZVtpobc+5m3UbKBYdp5TizhSSed/71jK6xXGbyUeFYd6tRnqHQaIOXc9jPR4cDOqDmQNupFzM7hiZUBHTlzzHl5c5p8Mpj3gqNpl5eOmpnOcY8OmXNMxrWxDIEa3wm9vh2Gl4wpluPOOxVQO1xre3PoITWA7idMZw5WkYlbrcjccp839rKIBcgG32sJ9OY5U158uk8N7W1FK/Eeo89rjyAmsvCY+VvgvEaK4ZDTKmw18ZgcW4kzsbGw2HKYvBfZ6vUuVdkF9SunpLuO9mnXes58WO8xNt3SuKljqYX7dTXdlH8QmY/BgPmJbxJMfQ4ci7KPSWSs2xqrigeY/mX9Z0q+4HT6TpdJt9jYdop6fhLWRe873ay6Y2otQizQl9go5xbOo5wu1I4bsIJwXaWmrd5BqH+xBtVGE7Sf2XtLHvu/wBJwxHb6S6NlJTy6RmGHxpf8S/8Wk+8DGJzEEEA7g7HkGnxfy7cPm5ZWcSy/wCPTjzg08S15jYo8pqF86BrWuL26Ei8z2S7T62dSZYTLG7leeTV5HhcGGF2NhBq1Vo5yPBb7XO14yrilpKM2g11nj/ajjWQfAQS98t9s/7vnqdOc4dTq46uON/qfTeONyy/HpcJxlBUVKh+JyFU62z9PP8ASa2C4gtUHkVJUjoQdZ8o4ZjqmIq4csQP/wBUvYWsUe4Ol9x1sJ6yjj8uJcrorm/nyMzh8q42Y5fd01n0deHpsY8y7ayziHut5Ww1VC6KxGrAeV57cq5Yxbw/CTU+JjkXlpcmPTg6J+8x7aD7TcLgDSZ+Jqx2yHdapvgqIqLVyAuisisSTZWILWGwJsNd481AZnYjEyn+0mYuWnSY7b71Lraea4nwqpiXyJa+hZibAC/nrL1HFHrPQ8PVQgOnxak9SZZe7gv8cs/C8IWmoDHMbWNtBoLaSa2Fp5CliAd7Myn+YG4mjiaoA0mPisVaauoxLaaSoOixgcHcTAq4030nU8Y0z3NdrYx1YU1vv0nzj2pxQVbHUjUD/MbHftPbV6qshB6TxGC4aeI1rk5EW+3Tt35S5ZbXHHTQ4FxZBTsfhNuem/eUOJ4pnPzWGvOemHszg6Y+NPeHlnOa5Avz05RdfgmB54emf4R97SyUtjwT4umnzOv8wnJxSmTZbt3ym3raetq8MwKbIo8PylZ6eFHyqBLpnbF/aD/l9T+k6amZPwL6/wBJ0iPp4HhIMrmtBNQ9Jpk4gdIp2729IDVDz0gMehk2aLqM42YegiWr1BzHrHt6xDW6fUxtdBNeod9fMSbE7j6wNJGcdY2aWsPWq0/ksBzB2+8tft9Q/Mik+MzPe9D9pBecc+lMmmrTxtzZlVVtrYkk9ABaKfEUwb6nyP6TMaoeRMXeoeYmsen2zW0sizi8XntpYAg2sTsbjlM3H4bCqHqZzRNT4QyqwdLsC2l9NBa9tjLTI3VfUwSDzt6mc/8Anx7u77amWvDHWhgqYLhnxDtYiwci40u5G/K/WFgUeqwtdnvf5Cn0bS3nNTTt6xmUHe0xfhy5b23OrZNE8e4qEC0i6o9sz5RmCg7Lfrz9J5nFcRVXzozMTvoTsOU9fkp8wp8hHIlO/wAi+NhN59HLK7tTHqYya0j2b9qKeKUI5K1VAuGBXOPxLfc9R5zSxNSVUpp+FB5KInE0GPy1Cv8AKR9ROtmUntJ279E4ipKT1ZFfh1c7VU81/SZ1Xg+Jb/GQeAt97zhZl6dsbj7M4nxynh1LOb9FGrMegE0fY72oSsgR2sTql9PFPETzr+zVUm7OrnuSZKey73uMlxqDrcHkRLjMsedGXblNbfRcRVmTiakzKL4xBZilUf6srevOIxFbEn/BJ8GQ/nN3LK/TGOMn2sORAFQCZTvizthn/mT9ZVqjGH/BZfrMf16a/n2L2n46KSe7Rhnfv8q9TMTg/HHw4OUFge+t+ek6vwB2Ys9Fyx1JOa5PjeKPs452ov8A7v1nWThi27Xa3tXUc3zeR5StV45Ufd7+dh6RJ9lah/wX/mI/OMHsaedNl/iMsjNof/I9WhLjl2vJHsZ2qD+L+kansXT5mqPMS6Tf4H9tp9frOln/AOnU+tX1E6Dl9Qzn8P1k5us6dKyAgTlUCROhAObRTOv9idOirAllimZev0nToUAy8vtJZPCdOlRwU+Fp2YyZ0Dhm7SfcOeYE6dKyCphG/FF/s3VjOnTKwa4cDnGKbaTp0NJzW5SPejnOnQRFx0nAgTp0iugsZM6VEBIevI2nToBe+Yb6xZxPaTOjaCNUd/WCMR4zp00iPe27yGrzp0lWJ9/pO94DyB8p06RXXHQTp06B/9k="
                  : item.imgurl,
            }}
          />

          <Text style={styles.spaName}>{item.item_name}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={{ right: 15 }} onPress={viewOnPress}>
          <Text style={styles.viewAll}>view all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={FlatListData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    marginTop: 15,
    flex: 1,
    flexDirection: "column",
    marginLeft: moderateScale(15),
  },
  spaName: {
    alignSelf: "center",
    textDecorationLine: "underline",
    color: colors.lightgray,
    fontSize: 12,
    textAlign: "center",
    paddingTop: moderateScale(5),
    fontFamily: "Roboto-Regular",
  },
  cardContainer: {
    width: moderateScale(155),
    padding: 0,
    margin: 0,
    borderRadius: moderateScale(10),
    marginRight: moderateScale(10),
    height: moderateScale(165),
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
    justifyContent: "space-between",
  },

  viewAll: {
    fontSize: 15,
    right: 10,
    color: colors.spaTextColor,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  title: {
    color: colors.darkGray,
    fontSize: 15,
    marginLeft: moderateScale(15),
    fontFamily: "Roboto-Regular",
  },

  cardImage: {
    height: moderateScale(125),
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
  },
});
export default SpaScreenComponent;
