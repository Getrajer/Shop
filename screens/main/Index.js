import React from 'react';
import { ScrollView, Button, Platform, Alert, View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../../constants/Colors';

const Index = () =>{

    return(
        <ScrollView>
        
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: "https://j9rsfjc29w-flywheel.netdna-ssl.com/wp-content/uploads/2017/04/img-banner2.png"}} />
            </View>
            <View style={styles.headerTxtBox}>
                <Text style={styles.headerTxt} >Welcome to <Text style={styles.green}>Greener</Text></Text>
                <Text style={styles.headerTxt2} > Your local grocery</Text>

            </View>
        </View>

        <View style={styles.headerLine}>
        </View>

        <View style={styles.aboutSection}>
            <View>
                <Text style={styles.aboutOfferTxt}>Our Offer</Text>
            </View>

            <View style={styles.aboutBox}>
                <View style={styles.imageContainerAbout}>
                    <Image style={styles.imageAbout} source={{uri: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/powerhouse_vegetables_slideshow/650x350_powerhouse_vegetables_slideshow.jpg"}} />
                </View>
                <View style={styles.aboutHBox}>
                    <Text style={styles.aboutTxtH}>
                        Vegetables
                    </Text>
                </View>

                <View style={styles.aboutTxtPBox}>
                    <Text style={styles.aboutTxtP}>
                        Try our vegetables. We do take care about our quality so we get them from most trusted suppliers.
                    </Text>
                </View>
            </View>

            <View style={styles.aboutBox}>
                <View style={styles.imageContainerAbout}>
                    <Image style={styles.imageAbout} source={{uri: "https://www.thedailymeal.com/sites/default/files/2019/06/13/exotic_fruits_hero.jpg"}} />
                </View>
                <View style={styles.aboutHBox}>
                    <Text style={styles.aboutTxtH}>
                        Fruits
                    </Text>
                </View>

                <View style={styles.aboutTxtPBox}>
                    <Text style={styles.aboutTxtP}>
                        Exotic, local and perfect quality. Try seasonal offers and flavors from around the globe!
                    </Text>
                </View>
            </View>

        </View>


        <View style={styles.contactUsContainer}>
            <View style={styles.contactBox}>
                <View>
                    <Text style={styles.contactLabel}>Contact US</Text>
                </View>
                <View style={styles.contactUnderlineContainer}>
                    <View style={styles.contactUnderline}></View>
                </View>
               

                <View>
                    <Text style={styles.contactVar}>Phone number: 432547574</Text>
                    <Text style={styles.contactVar}>Email: greener@greener.com</Text>
                </View>
            </View>


            <View style={styles.contactBox}>
                <View>
                    <Text style={styles.contactLabel}>Address</Text>
                </View>
                <View style={styles.contactUnderlineContainer}>
                    <View style={styles.contactUnderline}></View>
                </View>

                <View>
                    <Text style={styles.contactVar}>11b Green Road</Text>
                    <Text style={styles.contactVar}>N64 0LT</Text>
                    <Text style={styles.contactVar}>London</Text>
                    <Text style={styles.contactVar}>United Kingdom</Text>
                </View>
            </View>

        </View>

        </ScrollView>

    )
}


const styles = StyleSheet.create({
    header:{
        height: 450,
        width: '100%',
        marginTop: 35,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%'
      },
      headerTxtBox: {
          marginHorizontal: 20,
      },
      headerTxt:{
          textAlign: 'center',
          fontSize: 35,
          fontWeight: '700',
          marginTop: 35
      },
      headerTxt2:{
            textAlign: 'center',
            fontSize: 17,
            marginTop: 10
      },
      green:{
          color: Colors.primary
      },
      headerLine:{
          backgroundColor: Colors.primary,
          width: '100%',
          height: 60
      },
      aboutSection:{
          marginHorizontal: 30
      },
      aboutOfferTxt:{
          fontSize: 25,
          marginVertical: 20,
          fontWeight: '700',
          textAlign: 'center',
          letterSpacing: 8
      },
      aboutBox:{
        height: 300,
        width: '100%'
      },
      aboutBox:{
        height: 400,
        width: '100%',
        marginTop: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 50
      },
      imageContainerAbout:{
        width: '100%',
        height: '50%',
        overflow: 'hidden',
      },
      imageAbout:{
        width: '100%',
        height: '100%'
      },
      aboutHBox:{
          backgroundColor: Colors.primary,
          paddingVertical: 10
      },
      aboutTxtH:{
          fontSize: 30,
          textAlign: 'center',
          color: 'white',
          fontWeight: '700'
      },
      aboutTxtPBox:{
        margin: 10,
        marginTop: 25
      },
      aboutTxtP:{
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 25
      },
      contactUsContainer:{
          backgroundColor: Colors.primary,
          color: 'white',
          marginTop: 40,
      },
      contactBox:{
          margin: 10,
      },
      contactLabel:{
          color:'white',
          fontWeight: '900',
          textAlign:'center',
          fontSize: 25
      },
      contactVar:{
          color:'white',
          textAlign:'center',
          color: '#F0F0F0'
      },
      contactUnderline:{
        height: 1,
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
      },
      contactUnderlineContainer:{
          marginHorizontal: 100,
      }

});

export default Index;