import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
// Importe o componente Link do expo-router para navegação
import { Link } from 'expo-router';

// Cores extraídas do seu protótipo para fidelidade visual.
const CORES = {
  fundo: '#8AB09B',
  botao: '#D4A76A',
  textoBotao: '#FFFFFF',
  placeholder: '#A9A9A9',
  branco: '#FFFFFF',
};

export default function App() {
  return (
    // SafeAreaView garante que o conteúdo não fique sob a barra de status ou o "notch" do iPhone.
    <SafeAreaView style={styles.container}>
      {/* A barra de status (onde fica o relógio, bateria, etc.) ficará com texto claro. */}
      <StatusBar barStyle="light-content" backgroundColor={CORES.fundo} />
      
      {/* ScrollView permite que a tela role em aparelhos menores, especialmente quando o teclado abrir. */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- CABEÇALHO COM IMAGEM DE FUNDO E LOGO --- */}
        <ImageBackground
          source={{ uri: 'https://placehold.co/600x450/3A5F4F/FFFFFF?text=Imagem+de+Fundo' }} // Você pode substituir pela sua imagem de fundo
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
          onError={(e) => console.log(e.nativeEvent.error)}
        >
          <View style={styles.logoContainer}>
            {/* AQUI ESTÁ A MUDANÇA: Carregando a imagem local da pasta assets */}
            <Image
              source={require('../assets/logo.png')} // O caminho é relativo a este arquivo (app/index.js)
              style={styles.logo}
            />
          </View>
        </ImageBackground>

        {/* --- CORPO DO FORMULÁRIO --- */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Olá</Text>
          <Text style={styles.subtitle}>Seja bem vindo!</Text>

          <View style={styles.inputContainer}>
            {/* CAMPO DE EMAIL */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={CORES.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* CAMPO DE SENHA */}
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={CORES.placeholder}
              secureTextEntry={true} // Esconde o texto da senha
            />

            {/* LINK "ESQUECEU SUA SENHA?" */}
            <TouchableOpacity onPress={() => console.log('Ir para recuperar senha')}>
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            {/* BOTÃO "SEGUIR" */}
            <TouchableOpacity 
              style={styles.followButton} 
              onPress={() => console.log('Botão Seguir pressionado')}
            >
              <Text style={styles.followButtonText}>SEGUIR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- RODAPÉ PARA CRIAR CONTA --- */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não possui uma conta? </Text>
          {/* Usamos o Link para navegar para a tela de signup. O href="/signup" funciona porque você criou o arquivo app/signup.js */}
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={[styles.footerText, styles.footerLink]}>Criar</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// StyleSheet.create é uma otimização que cria os estilos uma vez.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  scrollContainer: {
    flexGrow: 1, // Garante que o conteúdo possa crescer para preencher o espaço
  },
  headerImage: {
    width: '100%',
    height: 250, // Altura da imagem de fundo
    alignItems: 'center', // Centraliza o logo horizontalmente
  },
  headerImageStyle: {
    // Aplica a borda arredondada apenas na parte de baixo da imagem
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoContainer: {
    // Estilos para o container do logo, para criar o efeito de sombra e borda
    marginTop: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 70, // Metade do tamanho do logo (120) + padding (10*2)
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Sombra para Android
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60, // Metade do tamanho para ser um círculo perfeito
  },
  formContainer: {
    flex: 1, // Ocupa o espaço restante
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: CORES.branco,
  },
  subtitle: {
    fontSize: 18,
    color: CORES.branco,
    marginTop: 4,
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
  },
  input: {
    backgroundColor: CORES.branco,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  forgotPasswordText: {
    color: CORES.branco,
    textAlign: 'right',
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: CORES.botao,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  followButtonText: {
    color: CORES.textoBotao,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  footerText: {
    color: CORES.branco,
    fontSize: 16,
  },
  footerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Adiciona sublinhado para parecer um link
  },
});
