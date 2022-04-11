<div align="center">
  <h1>Observabilidade com Prometheus + Grafana e NodeJs</h1>
</div>

----

## Tópicos

  - Aplicação básica com `node.js`
  - `Prometheus`
    
    - [prometheus.io](https://prometheus.io/docs/introduction/overview/)

  - `Grafana`

    - [grafana](https://grafana.com/docs/?pg=oss-graf&plcmt=quick-links)

  - `cAdvisor` **(Tópico para estudo no futuro próximo)**


## Objetivo do projeto

Estudar concéitos básicos de monitoramento de aplicações com o `prometheus` e o `grafana`.

## Para execultar o projeto 

```
sudo docker-compose up
```

## Fazendo um caminhão de requisições

> Sugestão use o `siege`, o qual uma boa ferramenta para realizar um número alto requests.

```
siege -c3 -v -r10 http://0.0.0.0:5000/user\?id\=7
```

> No comando acima, `-c3` está  simulando 3 usuário e cada um está fazendo 10 requests `-r10`, e o `-v` é de verbose msm.

### Instalação do `Siege`

```
siege apt update -y
```

```
sudo apt install siege -y
```

```
siege --version
```

## `Problema de permissão`

> Caso tenha problema de permissão com o `grafana` use o comando abaixo:

```
sudo chown -R 472:472 docker/grafana
```
