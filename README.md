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

## Funções

```
increase(estudo_request_total[1m])
```

> calcula o aumento na série temporal no vetor de intervalo.

```
sum(increase(estudo_request_total[1m]))
```


```
sum(increase(estudo_request_total{statusCode="200"}[1m]))
```

## PromQL


### Tipos de dados

- Scalar
- Instant vector
- Range vector

> Vector: Vetor com várias séries temporais existentes

```
estudo_request_total[1m:15s]
```

> [1m:15s] -> 1 minuto com intervalos de 15 segundos


### Filtrando por labels

- api_requests_total

  - Total (Sem filtros)

- api_requests_total{code="200"}

  - Filtrar pelo code `200`

- api_requests_total{code!="200"}

  - Filtrar pelo code direferente de `200`

- api_requests_total{method=~"GET|POST"}
  
  - RegExp: `GET|POST`

- api_requests_total{method="GET", code!="200"}

  - Duas labels

- estudo_request_total{method="GET", statusCode=~"2.."}

  - RegExp: `2..`

### Trabalhando com counters

```
rate(estudo_request_total[1m])
```

> rate: calcula a taxa média de aumento por segundo da série temporal no vetor de intervalo.


#### Error

```
estudo_request_total[1m]
```

> Erro ao executar a consulta: tipo de expressão inválido "vetor de intervalo" para consulta de intervalo, deve ser escalar ou vetor instantâneo

### Trabalhando com histogramas

```
histogram_quantile(0.9, rate(estudo_request_time_seconds_histogram_bucket[10m]))
```

> calcula o φ-quantil (0 ≤ φ ≤ 1) dos baldes bde um histograma . (Veja histogramas e resumos para uma explicação detalhada dos quantis φ e o uso do tipo de métrica de histograma em geral.) As amostras em bsão as contagens de observações em cada balde. Cada amostra deve ter um rótulo leem que o valor do rótulo denota o limite superior inclusivo do bucket. (Amostras sem esse rótulo são ignoradas silenciosamente.) O tipo de métrica de histograma fornece automaticamente séries temporais com o _bucketsufixo e os rótulos apropriados. Use a rate()função para especificar a janela de tempo para o cálculo do quantil.

```
histogram_quantile(0.9, sum by (job, le) (rate(estudo_request_time_seconds_histogram_bucket[10m])))
```

> O quantil é calculado para cada combinação de rótulos em http_request_duration_seconds. Para agregar, use o sum()agregador em torno da rate()função. Como o lerótulo é exigido por histogram_quantile(), ele deve ser incluído na bycláusula. A seguinte expressão agrega o 90º percentil por job:


### Calculando tempo de resposta médio

```
increase(estudo_request_time_seconds_histogram_sum[1m]) / increase(estudo_request_time_seconds_histogram_count[1m])
```


### Operadores de agregação

```
sum(estudo_request_total) by (statusCode)
```



## `Problema de permissão`

> Caso tenha problema de permissão com o `grafana` use o comando abaixo:

```
sudo chown -R 472:472 docker/grafana
```
