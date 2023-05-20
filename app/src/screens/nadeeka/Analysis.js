import { StyleSheet, Text, View, Button, TouchableOpacity, Image  } from "react-native";
import React, { useState } from "react";

const Analysis = () => {

  const [selectedImage, setSelectedImage] = useState(null);



  const data = [
    { id: 1, date: 'John Doe',  image: 22, mealybugs: 'John Doe',  mites: 25, location: 'John Doe',  diseasesymptoms: 25 },
    { id: 2, date: 'Jane Smith', image: 30, mealybugs: 'John Doe',  mites: 25, location: 'John Doe',  diseasesymptoms: 25 },
    { id: 3, date: 'Bob Johnson', image: 35, mealybugs: 'John Doe',  mites: 25, location: 'John Doe',  diseasesymptoms: 25 },
    { id: 4, date: 'John Doe', image: 25, mealybugs: 'John Doe',  mites: 25, location: 'John Doe',  diseasesymptoms: 25 },
    { id: 5, date: 'Jane Smith', image: 30, mealybugs: 'John Doe',  mites: 25, location: 'John Doe',  diseasesymptoms: 25 },
   
  ];

  
  const handleImageUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setSelectedImage(res);
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the image picker");
      } else {
        console.log("Error occurred while picking an image:", err);
      }
    }
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cococare Dataset</Text>
      <Text style={styles.title2}>Find out your analysis</Text>

      <View style={styles.HomeButton}>
        <Button title="Mealy Bugs & Mites Diseases of image capturing by IOT device" color='green' onPress={() => alert("welcome")} />
      </View>

      <View style={styles.HomeButton}>
        <Button title="Solutions for image capturing diseases" color='green' onPress={() => alert("welcome")} />
      </View>

      <Text style={styles.title2}>Cococare Dataset</Text>


      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Image</Text>
        <Text style={styles.headerText}>Mealy Bugs</Text>
        <Text style={styles.headerText}>Mites</Text>
        <Text style={styles.headerText}>Location</Text>
        <Text style={styles.headerText}>Diseases Symptoms</Text>
      </View>

      {/* Table Rows */}
      {data.map((item) => (
        <View style={styles.tableRow} key={item.id}>
          <Text style={styles.rowText}>{item.id}</Text>
          <Text style={styles.rowText}>{item.date}</Text>
          <TouchableOpacity style={styles.uploadButton}
            onPress={() => handleImageUpload(item.id)}
          >
            <Text style={styles.uploadButtonText}>Select Image</Text>
          </TouchableOpacity>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.selectedImage}
        />
        )}
          <Text style={styles.rowText}>{item.mealybugs}</Text>
          <Text style={styles.rowText}>{item.mites}</Text>
          <Text style={styles.rowText}>{item.location}</Text>
          <Text style={styles.rowText}>{item.diseasesymptoms}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: 'green',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: 10,
  },
  HomeButton: {
    width: 250,
    height: 87,
    left: 70,
    borderRadius: 150,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  uploadButton: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedImage: {
    width: 50,
    height: 50,
    marginTop: 10,
  },

});

export default Analysis;
