// Old route: the story list now lives in the Biblioteca.
import { Redirect } from 'expo-router';

export default function Stories() {
  return <Redirect href={{ pathname: '/library', params: { tab: 'stories' } }} />;
}
