import useAuth from '@/hooks/queries/useAuth';
import {deviceType} from '@/utils';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

const RootNavigator = () => {
  const {isLogin} = useAuth();

  console.log({'Device Type': deviceType, isLogin});

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
};

export default RootNavigator;
