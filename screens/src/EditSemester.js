import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Switch } from 'react-native-paper';

import { Picker } from "@react-native-picker/picker";

import subjects from './mocks/subjects.json';

import openDB from "../../db";

const db = openDB();

function SelectSubjects({ subjectsOfWeek, dayOfWeek }) {

    const [selectedSubject, setSelectedSubject] = useState();


    return (
        <View>
            <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
            <Picker
                selectedValue={selectedSubject}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedSubject(itemValue)
                }>

                {subjectsOfWeek.map((subject) => {
                    return (
                        <Picker.Item label={subject.name} value={subject.name} />
                    );
                })}

            </Picker>
        </View>
    );
}

export default function EditSemester({ route }) {

    const { ID } = route.params;
    const subjectsMonday = subjects.monday.subjects;
    const subjectsTuesday = subjects.tuesday.subjects;
    const subjectsWednesday = subjects.wednesday.subjects;
    const subjectsThursday = subjects.thursday.subjects;
    const subjectsFriday = subjects.friday.subjects;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    function recoverData() {
        db.transaction(tx => {
          tx.executeSql("SELECT * FROM usuarios WHERE id = ?", [ID], (_, rs) => {
            setUsuarios(rs.rows._array);
            setLoading(false);
          });
        });
      }

    return (
        <>
            <TextInput
                style={styles.inputSemesterName}
                placeholder="Digite o semestre"
                label="Digite o semestre"

            ></TextInput>


            <SelectSubjects dayOfWeek='Segunda-feira' subjectsOfWeek={subjectsMonday} />
            <SelectSubjects dayOfWeek='Terça-feira' subjectsOfWeek={subjectsTuesday} />
            <SelectSubjects dayOfWeek='Quarta-feira' subjectsOfWeek={subjectsWednesday} />
            <SelectSubjects dayOfWeek='Quinta-feira' subjectsOfWeek={subjectsThursday} />
            <SelectSubjects dayOfWeek='Sexta-feira' subjectsOfWeek={subjectsFriday} />

            <View style={styles.currentSemester}>
                <Text>Semestre Atual?</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <Button style={styles.btnSave} mode="contained" color="green">
                Salvar Semestre
            </Button>
        </>
    );
}



const styles = StyleSheet.create({

    currentSemester: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    },
    inputSemesterName: {
        height: 50,
        fontSize: 18,
        margin: 5,
        lineHeight: 45,
        marginBottom: 10
    },
    btnSave: {
        marginTop: 10,
        width: '50%',
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center'
    },

    dayOfWeek: {
        fontSize: 18,
        marginLeft: 10,
    }
});