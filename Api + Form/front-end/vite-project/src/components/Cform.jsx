import { useEffect, useRef, useState } from 'react';
import './cform.css';
import Trash from '../assets/img/icon/trash-solid.svg';
import api from '../services/api';

export default function Cform() {
  // Estado para armazenar usuários
  const [users, setUsers] = useState([]);
 
 
  /* Função para buscar usuários da API */
  async function getUsers() {
    try {
      const response = await api.get('/usuarios');
      setUsers(response.data); // Atualiza o estado com os dados da API
    } catch (error) { 
      console.error('Erro ao buscar usuários:', error);
    }
  }


                  /* Chamada da API ao carregar o componente */
                  useEffect(() => {  getUsers();   }, []);


                  const inputName  = useRef()
                  const inputEmail = useRef()
                  const inputAge   = useRef()
                   /* Função para cadastrar usuários na API */
                  async function postUsers() {
                    try {
                      
                      await api.post('/usuarios', {
                        name: inputName.current.value,
                        age: inputAge.current.value,
                        email: inputEmail.current.value

                        
                      })
                      getUsers()
                      alert('usuario cadastrado com sucesso')


                    } catch (error) { 
                      console.log('erro:', error)
                    }
                  }
                  async function deleteUser(id) {
                    try {
                      await api.delete(`/usuarios/${id}`);
                      getUsers();
                      alert('usuario deletado')
                    } catch (error) {
                      console.log('Erro ao deletar usuário:', error);
                    }
                  }
                  


  return (
    <section className="form">



      {/* Formulário de Cadastro */}
      <form className="cform" action="" method="post">
        <h1>Cadastrar</h1>

        <input type="text" name="name" placeholder="Your name"  ref={inputName}/>
        <input type="number" name="age" placeholder="Your age" ref={inputAge} />
        <input type="email" name="email" placeholder="Your email" ref={inputEmail} />

        <button className="btn btn-submit" onClick={postUsers} type="button">Cadastrar</button>
      </form>






      {/* Painel de Controle de Usuários */}
      <div className="painel-usuarios">
        {users.length > 0 ? (
          users.map((item) => (
            <section key={item.id} className="painel-form-user">
              <div className="core-use">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Idade:</strong> {item.age}</p>
                <p><strong>Email:</strong> {item.email}</p>
              </div>
              <button className="btn" onClick={() => deleteUser(item.id)}  type="button">
                <img src={Trash} alt="icon lixeira" />
              </button>
            </section>
          ))
        ) : (
          <p className="no-users">Nenhum usuário cadastrado.</p>
        )}
      </div>
    
    
    
    
    </section>
  );
}
