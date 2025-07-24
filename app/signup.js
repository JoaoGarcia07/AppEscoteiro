import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert, // Usaremos para mostrar alertas ao usuário
} from 'react-native';
import { Link, router } from 'expo-router';

// Cores do protótipo
const CORES = {
  fundo: '#8AB09B',
  botao: '#D4A76A',
  textoBotao: '#FFFFFF',
  placeholder: '#A9A9A9',
  branco: '#FFFFFF',
};

// --- O PASSO MAIS IMPORTANTE ---
// Substitua 'SEU_IP_AQUI' pelo endereço IPv4 do seu computador.
// Para achar no Windows: abra o CMD e digite 'ipconfig'.
const API_URL = 'http://172.18.132.23:3001/api/cadastrar';


// Componente para o Checkbox customizado
const Checkbox = ({ label, value, onValueChange }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onValueChange}>
    <View style={[styles.checkboxBase, value && styles.checkboxChecked]}>
      {value && <Text style={styles.checkboxCheckmark}>✓</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function SignUpScreen() {
  // Estados para guardar o que o usuário digita
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [isPaisResponsaveis, setIsPaisResponsaveis] = useState(false);
  const [isEscoteiros, setIsEscoteiros] = useState(true); // Deixar um como padrão

  // Função para lidar com o cadastro, agora conectando na API
  const handleCadastro = async () => {
    // Validações básicas no frontend
    if (!nome || !email || !senha || !confirmaSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Determina o tipo de usuário baseado no checkbox
    const tipo_usuario = isPaisResponsaveis ? 'Pais' : 'Escoteiro';

    try {
      // Faz a requisição para a nossa API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
          tipo_usuario: tipo_usuario,
        }),
      });

      const data = await response.json();

      if (response.ok) { // Status 2xx (ex: 201 Created)
        Alert.alert('Sucesso!', data.message);
        router.replace('/'); // Volta para a tela de login
      } else { // Status 4xx ou 5xx
        Alert.alert('Erro no Cadastro', data.message || 'Ocorreu um erro.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível se conectar ao servidor. Verifique o IP e se o backend está rodando.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={CORES.fundo} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* AQUI ESTÁ A CORREÇÃO: Usando uma URL temporária em vez de um ficheiro local */}
        <ImageBackground
          source={{ uri: 'https://placehold.co/600x450/3A5F4F/FFFFFF?text=Imagem+de+Fundo' }}
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
        >
          <Link href="/" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>‹ Voltar</Text>
            </TouchableOpacity>
          </Link>
        </ImageBackground>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Crie sua conta</Text>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
            <TextInput style={styles.input} placeholder="Confirme senha" secureTextEntry value={confirmaSenha} onChangeText={setConfirmaSenha} />

            <View style={styles.checkboxGroup}>
              <Checkbox label="Pais responsáveis" value={isPaisResponsaveis} onValueChange={() => { setIsPaisResponsaveis(true); setIsEscoteiros(false); }} />
              <Checkbox label="Escoteiros" value={isEscoteiros} onValueChange={() => { setIsEscoteiros(true); setIsPaisResponsaveis(false); }} />
            </View>

            <TouchableOpacity style={styles.followButton} onPress={handleCadastro}>
              <Text style={styles.followButtonText}>SEGUIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CORES.fundo },
  scrollContainer: { flexGrow: 1 },
  headerImage: { width: '100%', height: 200 },
  headerImageStyle: { borderBottomLeftRadius: 50, borderBottomRightRadius: 50 },
  backButton: { position: 'absolute', top: 50, left: 20, padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 },
  backButtonText: { color: CORES.branco, fontSize: 16, fontWeight: 'bold' },
  formContainer: { flex: 1, alignItems: 'center', paddingTop: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: CORES.branco, marginBottom: 30 },
  inputContainer: { width: '80%' },
  input: { backgroundColor: CORES.branco, borderRadius: 30, paddingVertical: 15, paddingHorizontal: 20, fontSize: 16, marginBottom: 20, elevation: 4 },
  followButton: { backgroundColor: CORES.botao, borderRadius: 30, paddingVertical: 18, alignItems: 'center', marginTop: 20 },
  followButtonText: { color: CORES.textoBotao, fontSize: 18, fontWeight: 'bold' },
  checkboxGroup: { paddingLeft: 10, marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkboxBase: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 2, borderColor: CORES.branco, marginRight: 10 },
  checkboxChecked: { backgroundColor: CORES.branco },
  checkboxCheckmark: { fontSize: 14, color: CORES.fundo, fontWeight: 'bold' },
  checkboxLabel: { color: CORES.branco, fontSize: 16 },
});
