import * as React from "react";
import { Text, StyleSheet, View , TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FontFamily, Color, Border, FontSize } from "../../assets/GlobalStyles";

const ServiceInfoPage = () => {
  const router = useRouter();
  function handleGoToMap() {
    // Add your logic for handling the 'Go to map' button press here
  }
  return (
    <View style={styles.serviceInfoPage}>
      <View style={styles.frame}>
        <View style={styles.frame1}>
          <View style={styles.ongoingJobsParent}>
            <Text style={styles.ongoingJobs}>Ongoing Jobs</Text>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require("../../assets/images/serviceinfo/frame-104.png")}
            />
          </View>
          <View style={styles.frame2}>
            <View style={styles.frameParent}>
              <View style={styles.vectorParent}>
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require("../../assets/images/serviceinfo/rectangle-30.png")}
                />
                <View style={styles.frame3}>
                  <View style={styles.frame4}>
                    <View style={styles.jobIdParent}>
                      <Text style={styles.jobId}>JOB ID</Text>
                      <Text
                        style={styles.c72542e944abB33b17458f6831}
                      >{`4602c725-42e9-44ab-b33b-17458f6831f7
`}</Text>
                    </View>
                  </View>
                  <View style={styles.frame5}>
                    <View style={styles.frame6}>
                      <View style={styles.frameGroup}>
                        <View style={styles.frameContainer}>
                          <View style={styles.samanthaWickremasingheParent}>
                            <Text style={styles.samanthaWickremasinghe}>
                              Samantha Wickremasinghe
                            </Text>
                            <Text style={styles.owner}>Owner</Text>
                          </View>
                          <Image
                            style={styles.usercircleIcon}
                            contentFit="cover"
                            source={require("../../assets/images/serviceinfo/usercircle.png")}
                          />
                        </View>
                        <View style={styles.frameView}>
                          <View style={styles.samanthaWickremasingheParent}>
                            <Text style={styles.samanthaWickremasinghe}>
                              Auto Miraj - Athurugiriya
                            </Text>
                            <Text style={styles.owner}>Service Center</Text>
                          </View>
                          <Image
                            style={styles.briefcaseIcon}
                            contentFit="cover"
                            source={require("../../assets/images/serviceinfo/briefcase.png")}
                          />
                        </View>
                        <View style={styles.frameParent1}>
                          <View style={styles.samanthaWickremasingheParent}>
                            <Text style={styles.samanthaWickremasinghe}>
                              CBH 7543
                            </Text>
                            <Text style={styles.owner}>Vehicle No</Text>
                          </View>
                          <Image
                            style={styles.carCompactSvgrepoCom1Icon}
                            contentFit="cover"
                            source={require("../../assets/images/serviceinfo/carcompactsvgrepocom-1.png")}
                          />
                        </View>
                      </View>
                    </View>
                    <Image
                      style={styles.frameInner}
                      contentFit="cover"
                      source={require("../../assets/images/serviceinfo/group-56.png")}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.trackingId64ed3500a916f6f8Parent}>
                <Text
                  style={styles.trackingId}
                >{`TRACKING ID : 64ed3500a916f6f81cd61f75 `}</Text>
                <View style={styles.frame7}>
                  <View style={styles.frame8}>
                    <View style={styles.samanthaWickremasingheParent}>
                      <Text style={styles.kamalHewage}>Kamal Hewage</Text>
                      <Text style={styles.driver}>Driver</Text>
                    </View>
                    <Image
                      style={styles.vectorIcon}
                      contentFit="cover"
                      source={require("../../assets/images/serviceinfo/vector.png")}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.frame9}>
              <Text style={styles.tracking}>Tracking</Text>
            </View>
          </View>
        </View>
        <View style={styles.frame10}>
          <View style={styles.frame11}>
            <Text style={styles.deliveryAddressNo}>
              Delivery Address: No. 24 , Peradeniya road, Kandy
            </Text>
              <View style={styles.frame12}>
                <Text style={styles.toBeDelivered}>To be delivered to</Text>
                <TouchableOpacity onPress={() => {router.push(`/location`)
            }}>
                  <View style={styles.buttonframeParent}>
                    <Image
                      style={styles.buttonframeIcon}
                      contentFit="cover"
                      source={require("../../assets/images/serviceinfo/buttonframe.png")}
                    />
                    <Text style={styles.goToMap}>Go to map</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ongoingJobs: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: "left",
    width: 136,
    height: 29,
  },
  frameChild: {
    position: "relative",
    borderRadius: Border.br_mini,
    width: 57,
    height: 57,
    marginLeft: 68,
  },
  ongoingJobsParent: {
    backgroundColor: Color.colorWhitesmoke,
    width: 392,
    height: 111,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 19,
    paddingTop: 56,
    paddingBottom: 14,
    marginLeft: 1,
  },
  frameItem: {
    position: "relative",
    borderRadius: Border.br_xl,
    width: 354,
    height: 216,
  },
  jobId: {
    position: "relative",
    fontSize: FontSize.size_5xs,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhitesmoke_100,
    textAlign: "left",
  },
  c72542e944abB33b17458f6831: {
    position: "relative",
    fontSize: FontSize.size_5xs,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhitesmoke_100,
    textAlign: "left",
    width: 169,
    height: 9,
    marginLeft: 9,
  },
  jobIdParent: {
    position: "absolute",
    top: 0,
    left: 110,
    height: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  frame4: {
    position: "absolute",
    top: 186,
    left: 0,
    width: 314,
    height: 9,
    overflow: "hidden",
  },
  samanthaWickremasinghe: {
    position: "relative",
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhitesmoke_100,
    textAlign: "left",
  },
  owner: {
    position: "relative",
    fontSize: FontSize.size_xs,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorWhitesmoke_100,
    textAlign: "left",
  },
  samanthaWickremasingheParent: {
    position: "absolute",
    top: 0,
    left: 45,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  usercircleIcon: {
    position: "absolute",
    top: 2,
    left: 0,
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  frameContainer: {
    position: "relative",
    width: 254,
    height: 34,
  },
  briefcaseIcon: {
    position: "absolute",
    height: "88.24%",
    width: "12.88%",
    top: "5.88%",
    right: "87.12%",
    bottom: "5.88%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  frameView: {
    position: "relative",
    width: 233,
    height: 34,
    marginTop: 32,
  },
  carCompactSvgrepoCom1Icon: {
    position: "absolute",
    height: "88.24%",
    width: "24.19%",
    top: "5.88%",
    right: "75.81%",
    bottom: "5.88%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  frameParent1: {
    position: "relative",
    width: 124,
    height: 34,
    marginTop: 32,
  },
  frameGroup: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frame6: {
    position: "absolute",
    top: 0,
    left: 2,
    width: 308,
    height: 166,
    overflow: "hidden",
  },
  frameInner: {
    position: "absolute",
    top: 48,
    left: 0,
    width: 312,
    height: 72,
  },
  frame5: {
    position: "absolute",
    top: 0,
    left: 1,
    width: 312,
    height: 166,
    overflow: "hidden",
  },
  frame3: {
    position: "relative",
    width: 314,
    height: 195,
    overflow: "hidden",
    marginTop: -200,
  },
  vectorParent: {
    width: 354,
    height: 216,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  trackingId: {
    position: "absolute",
    top: 52,
    left: 164,
    fontSize: FontSize.size_5xs,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorDarkgray_100,
    textAlign: "left",
  },
  kamalHewage: {
    position: "relative",
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
    textAlign: "left",
  },
  driver: {
    position: "relative",
    fontSize: FontSize.size_xs,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: "rgba(0, 0, 0, 0.67)",
    textAlign: "left",
  },
  vectorIcon: {
    position: "absolute",
    height: "76.07%",
    width: "16.16%",
    top: "17.65%",
    right: "83.84%",
    bottom: "6.29%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  frame8: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 160,
    height: 34,
    overflow: "hidden",
  },
  frame7: {
    position: "absolute",
    top: 13,
    left: 21,
    width: 311,
    height: 34,
    overflow: "hidden",
  },
  trackingId64ed3500a916f6f8Parent: {
    position: "relative",
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 13,
    elevation: 13,
    shadowOpacity: 1,
    width: 354,
    height: 66,
    marginTop: 10,
  },
  frameParent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 292,
    marginLeft: 20,
  },
  tracking: {
    position: "absolute",
    height: "100%",
    width: "75.56%",
    top: "0%",
    left: "24.44%",
    fontSize: FontSize.size_base,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: "left",
  },
  frame9: {
    position: "relative",
    width: 90,
    height: 19,
    overflow: "hidden",
    marginTop: 23,
  },
  frame2: {
    width: 374,
    height: 334,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 26,
  },
  frame1: {
    width: 393,
    height: 471,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  deliveryAddressNo: {
    position: "absolute",
    top: 55,
    left: 25,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.bodyNormalBold,
    color: Color.colorBlack,
    textAlign: "left",
    width: 295,
  },
  toBeDelivered: {
    position: "absolute",
    top: 0,
    left: 79,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.bodyNormalBold,
    color: Color.colorBlack,
    textAlign: "left",
  },
  buttonframeIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: Border.br_mini,
    width: 291,
    height: 38,
  },
  goToMap: {
    position: "absolute",
    top: 11,
    left: 107,
    fontSize: FontSize.bodyNormalBold_size,
    lineHeight: 15,
    fontWeight: "700",
    fontFamily: FontFamily.bodyNormalBold,
    color: Color.colorWhitesmoke_100,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 79,
    height: 20,
  },
  buttonframeParent: {
    position: "absolute",
    top: 95,
    left: 0,
    width: 291,
    height: 38,
  },
  frame12: {
    position: "absolute",
    top: 19,
    left: 27,
    width: 291,
    height: 133,
    overflow: "hidden",
  },
  frame11: {
    position: "absolute",
    top: 0,
    left: 25,
    borderRadius: Border.br_xl,
    backgroundColor: "rgba(217, 217, 217, 0.6)",
    width: 349,
    height: 165,
    overflow: "hidden",
  },
  frame10: {
    position: "relative",
    width: 393,
    height: 165,
    overflow: "hidden",
    marginTop: 19,
  },
  frame: {
    width: 393,
    height: 655,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  serviceInfoPage: {
    position: "relative",
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 852,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default ServiceInfoPage;
