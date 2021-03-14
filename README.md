# TypeORM Example
## Descrição
Exemplo de utilização do TypeORM com o docker e heroku. 
Este projeto foi elaborado como um exemplo abordando utilizar um banco mssql (sql server) no doker e outro com o mesmo esquema de dados dentro do heroku com banco postgres.
Quando roda local deve utilizar DATABASE_URL para conectar no banco sqlserver local, quando roda no heroku, lá por default usa o DATABASE_URL que aponta para o banco postgres.
Mesmo o banco local sendo diferente do banco remoto ao rodar as rotinas deverá usar o Typeorm para gerar as tabelas. Como o Typeorm não faz distinção de banco, os mesmo scripts models podem ser usados para criar as tabelas. 
Também com exemplos de como versionar um banco com o CLI e estrururas de relacionamento, tudo com o TypeOrm.

### 1 - Instalação do Docker 
Primeiro baixe o docker na sua máquina e instale, ele roda em linux ou windowns 10. Mas no caso do windowns 10 somente nas verões que possuem o kernel do linux.
O download pode ser feito aqui: https://www.docker.com/products/docker-desktop

### 2 - Instalando um banco de dados no docker. 
Com o Doker instalado, crie um banco de dados baixando uma imagem no https://hub.docker.com/. Nesse projeto vou utilizar uma do sqlserver, mas você pode escolher o banco que mais gosta de usar. O link desta imagem está aqui: https://hub.docker.com/_/microsoft-mssql-server

**1 - Para o sqlserver execute o comando para baixar a imagem no doker:**
``` bash
docker pull mcr.microsoft.com/mssql/server:2017-latest
```
**2 - Para criar a instância do banco execute o comando abaixo considerando o padrão de senhas do sqlserver:**
``` bash
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1440:1433 -d mcr.microsoft.com/mssql/server:2017-latest
```
Defini uma senha para o banco que se encontra no arquivo ormconfig.json na porta 1440, mas você pode definir a porta e a senha que quiser, ao conectar nessa porta ele direciona para porta 1433 dentro do docker. **Nesse momento não me preocupei em expor a senha do banco, porquê é um banco para fins de teste, tenha esse cuidado no gitHub**.

### 3 - Instalação doSQL Server Management Studio (SSMS)
Baixar o SQL Server Management Studio (SSMS) para manipular o banco de dados:
https://docs.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15
Como a Microsoft vive mudando os links, pesquise pelo nome que achará facilmente.

### 4 - Instalação da Aplicação 
``` bash
# install dependencies
npm install

# install devDependencies
npm install --save-dev
```

### 5 - Versionando seu banco
``` bash
# Executar o comadno abaixo para criar uma migration (ver o script "typeorm" em package.json). Vai gerar o fonte chamado <timestamp-createClass.ts>
npm run typeorm migration:create -- -n CreateClass

# Ao gerar o 1614027434846-createClass.ts no comando acima serão criados dois métodos async "up" e "down" onde "up" cria e constroe e "down" desfaz ou dropa etc.
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class',
            // código omitido, onde você define a tabela e colunas da migração.
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // código omitido
  }

# Executando a migration gerada no comando acima vai gerar um arquivo chamado <timestamp-createClass.ts>
npm run typeorm migration:run

# observe na sequencia que vai criar a tabela "class" e a "migration" que server para guardar as mudanças de versão. O mesmo foi feito para a tabela "lesson"

# comando para criar a tabela a partir da model, ao executar também verciona criando o migration, bom para quando criar um campo novo na tabela
npm run typeorm migration:generate -- -n CreateClass

# comando para criar uma entity a partir da tabela do banco.
npx typeorm entity:create -n Class
```
### 6 - Inserir e Pesquisar Dados no Postman

Primeiro execute o comando subindo a aplicação na porta 3000
``` bash
npm start 
```

Usando POST para inserir http://localhost:3000/class 
``` bash
{
    "name": "Tecnologia da Informação",
    "duration": 120
}
```

Usando GET para consultar a lista de dados 
http://localhost:3000/class/all

Usando GET para pesquisar pelo id
http://localhost:3000/class/id/<id>

Usando GET para pesquiser pelo nome da class
http://localhost:3000/class/name/<name>

### 7 - Subir projeto no Heroku
As adequações para subir este projeto no Heroku podem ser vistas na branch **feature/heroku-adequacoes**.
Obviamente precisa ter uma conta no heroku. A documentação e o CLI do heroku está disponível nesta página;
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

Use o comando abaixo para fazer login, deve abrir uma janela de autenticação pedindo para você usar seu usuário e senha do heroku:
``` bash
heroku login
```
Se ocorrer um erro como este:
``` bash
TypeError: Cannot read property 'id' of undefined
```
ou não abrir o browser, ou aparecerem erros de autenticação como abaixo:
``` bash
remote: !       WARNING:
remote: !       Do not authenticate with username and password using git.
remote: !       Run `heroku login` to update your credentials, then retry the git command.
remote: !       See documentation for details: https://devcenter.heroku.com/articles/git#http-git-authentication
fatal: Authentication failed for 'https://git.heroku.com/typeorm-example.git/'
```
É porque não conseguiu autenticar, deve estar usando um computador organizacional. Siga os 10 passos abaixo para resolver.

### Como logar no heroku no Windows 10, siga as etapas abaixo:

1 - Clique com o botão direito no cadeado e clique em Certificado para visualizar os detalhes do emissor do certificado. Mas esteja logado na sua conta de e-mail que usou para criar a conta no heroku.

2 - Abra a guia Caminho de certificação.

3 - Escolha o primeiro certificado que aparece no topo da lista e pressione o botão "Exibir certificado".

4 - Abra a guia Detalhes e clique no botão Copiar para arquivo.

5 - Escolha o formato X.509 codificado em base64 (* .cer) e clique no botão "Avançar", Vai abrir uma caixa de dialogo.

6 - Clique no botão "Procurar" como o arquivo não existe, insira um local de sua preferencia e nome de arquivo que quiser. Lembre-se de salvar com a extensão "cer". Exemplo: C:\seu\diretorio\proxy.cer.

7 - Feche as janelas, abra o prompt de comando do Windows e execute a seguinte linha de comando (substitua o local pelo caminho onde você salvou o certificado):
``` bash
SET NODE_EXTRA_CA_CERTS=C:\seu\diretorio\proxy.cer.
```

8 - Reverta para o antigo comportamento do OpenSSL:
``` bash
git config --global http.sslBackend "openssl"
git config --global http.sslCAInfo D:\Users\uendel\Desktop\proxy.cer
```

9 - Faça login heroku. Uma guia será aberta no navegador. Clique no botão Login.
``` bash
heroku login
```

10 - Verifique se a instalação foi bem-sucedida executando
``` bash
heroku whoami
```

### Mais referencias:
- Você pode ver a documentação completa do TypeOrm aqui:
https://typeorm.io/

- O curso completo onde aprendi sobre este projeto se encontra em:
https://www.youtube.com/playlist?list=PLDqnSpzNKDvn-3cpMf3yPn7gTnb3ooy4b

- Sobre problemas de login no Heroku
https://github.com/heroku/cli/issues/1054