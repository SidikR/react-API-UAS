import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            isError: false
        };
    }

    // Mount User Method
    componentDidMount() {
        this.getGithubUser()
    }

    //   Get Api Users
    getGithubUser = async () => {
        try {
            const response = await Axios.get(`https://api.github.com/users?since=135`)
            this.setState({ isError: false, isLoading: false, data: response.data })

        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }



    render() {
        //  If load data
        if (this.state.isLoading) {
            return (
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                >
                    <ActivityIndicator size='large' color='red' />
                </View>
            )
        }
        // If data not fetch
        else if (this.state.isError) {
            return (
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                >
                    <Text>Terjadi Error Saat Memuat Data</Text>
                </View>
            )
        }
        // If data finish load
        return (
            <FlatList
                data={this.state.data}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', { login: item.login })}>
                        <View style={styles.viewList}>
                            <View>
                                <Image source={{ uri: `${item.avatar_url}` }} style={styles.Image} />
                            </View>
                            <View>
                                <Text style={styles.textItemLogin}> {item.login}</Text>
                                <Text style={styles.textItemUrl}> {item.html_url}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={({ id }, index) => index}
            />
        );
    }
}


class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            isError: false
        };
    }

    componentDidMount() {
        this.getDetailGithubUser()
    }

    //   Get Api Users
    getDetailGithubUser = async () => {
        try {
            const response = await Axios.get(`https://api.github.com/users/${this.props.navigation.state.params.login}`)
            this.setState({ isError: false, isLoading: false, data: response.data })
            console.log(response.data)

        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }

    render() {
        //  If load data
        if (this.state.isLoading) {
            return (
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                >
                    <ActivityIndicator size='large' color='red' />
                </View>
            )
        }
        // If data not fetch
        else if (this.state.isError) {
            return (
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                >
                    <Text>Terjadi Error Saat Memuat Data</Text>
                </View>
            )
        }
        // If data finish load
        return (
            <View style={styles.detaiiView}>
                <Image source={{ uri: this.state.data.avatar_url }} style={styles.ImageDetail} />
                <View style={styles.viewContent}>
                    <Text style={styles.textItemLogin}>Name : {this.state.data.login}</Text>
                    <Text style={styles.textOther}>Public Repo : {this.state.data.public_repos}</Text>
                    <Text style={styles.textOther}>Followers : {this.state.data.followers}</Text>
                    <Text style={styles.textOther} >Public Gist : {this.state.data.public_gists}</Text>
                    <Text style={styles.textItemUrl} >URL : {this.state.data.html_url}</Text>
                </View>




            </View>
        );
    }
}



const RootStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
});

const styles = StyleSheet.create({
    viewList: {
        height: 100,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center'
    },
    Image: {
        width: 88,
        height: 80,
        borderRadius: 40
    },
    textItemLogin: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginLeft: 20,
        fontSize: 16
    },
    textOther: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginLeft: 20,
        fontSize: 14,
        color: '#555555'
    },
    textItemUrl: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 12,
        marginTop: 10,
        color: 'blue'
    },
    // Detail Screen Style
    detaiiView: {
        flex: 1,
        alignItems: 'center',
    },
    ImageDetail: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20
    },
    viewContent: {
        marginTop: 50,
    },
})

export default createAppContainer(RootStack);