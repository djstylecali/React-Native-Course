import React, { useContext, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderTitle } from '../components/HeaderTitle';
import { styles } from '../theme/appTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const PullToRefreshScreen = () => {

    const { top } = useSafeAreaInsets();
    const { theme:{ colors, dividerColor, dark } } = useContext( ThemeContext );
    const [ refreshing, setRefreshing] = useState(false);
    const [ data, setData] = useState<string>();

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            console.log('Terminamos');
            setRefreshing(false);
            setData('Hola mundo');
        }, 1500);
    };

    return (
        <ScrollView
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                marginTop: refreshing ? top : 0,
            }}
            refreshControl={
                <RefreshControl
                    refreshing={ refreshing }
                    onRefresh={ onRefresh }
                    progressViewOffset={ 10 }
                    progressBackgroundColor={ dividerColor }
                    colors={ [ colors.text ] }
                    // style={{ backgroundColor: '#5856D6' }}
                    tintColor={ dark ? 'white' : 'black' }
                />
            }
        >
            <View style={ styles.globalMargin }>
                <HeaderTitle title="Pull to refresh" />

                {
                    data && <HeaderTitle title={ data } />
                }
            </View>
        </ScrollView>
    );
};
