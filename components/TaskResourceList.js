import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const TaskResourceList = ({
  task,
  planId,
  t,
  onDeleteCustomResource,
  onAddResource,
}) => {
  const { resources, customResources } = task;

  return (
    <View style={styles.resourceWrapper}>
      {/* Default Resources */}
      {resources &&
        Object.keys(resources).map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.resourceBtn,
              { backgroundColor: t.background.surfaceHighlight },
            ]}
            onPress={() => Linking.openURL(resources[key])}
          >
            <Text style={[styles.resourceText, { color: t.text.primary }]}>
              {key.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}

      {/* Custom Resources */}
      {customResources &&
        customResources.map((res) => (
          <View
            key={res.id}
            style={[
              styles.resourceBtn,
              styles.customResourceBtn,
              { backgroundColor: t.background.surfaceHighlight },
            ]}
          >
            <TouchableOpacity onPress={() => Linking.openURL(res.url)}>
              <Text style={[styles.resourceText, { color: t.brand.primary }]}>
                {res.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteResourceBtn}
              onPress={() => onDeleteCustomResource(planId, task.id, res.id)}
            >
              <Ionicons name="close" size={14} color={t.status.error} />
            </TouchableOpacity>
          </View>
        ))}

      {/* Add Button */}
      <TouchableOpacity
        style={[
          styles.resourceBtn,
          {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: t.brand.primary,
            borderStyle: "dashed",
          },
        ]}
        onPress={() => onAddResource(planId, task.id)}
      >
        <Text style={[styles.resourceText, { color: t.brand.primary }]}>
          + LINK
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  resourceWrapper: { flexDirection: "row", flexWrap: "wrap", marginLeft: 36 },
  resourceBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  customResourceBtn: { paddingRight: 8 },
  deleteResourceBtn: { marginLeft: 6, padding: 2 },
  resourceText: { fontSize: 12, fontWeight: "700" },
});
