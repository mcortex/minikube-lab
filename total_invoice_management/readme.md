Sistema de consulta por numero de factura (invoice_id) utilizando microservicios:

Como ejecutar:

* Ejecutar para compartir el repositorio de docker:

 `eval $(minikube docker-env)`

* Build de las imagenes:

 `docker build -t invoices_svc:prueba_db5 invoices_svc`

 `docker build -t frontend_svc:v1 frontend_svc`

* Inicializamos minikube

 `minikube start`

* Creamos el secret para la BBDD:

 `kubectl create secret generic mysql-pass --from-literal=password=<mysql_pwd> #pass en db/mysql_pwd.txt`

* Activamos deployments y services:

 `kubectl apply -f kube`

* Verificar que estan levantados los pods:

 `kubectl get pods -o wide`

* Verificar servicios:

 `kubectl get services -o wide`

* Verificar deployments:

 `kubectl get deploy -o wide`

* Alta de la Base de Datos:

 - Conectarse al pod de MySQL:

 `kubectl exec -it $(kubectl get pod |grep invoices-svc-mysql|awk '{print $1}') /bin/bash`

 - Conectarse a la base de datos:

 `mysql -u root -p #Password en db/mysql_pwd.txt`

 - Inicializar la base de datos según el contenido del archivo alta_db.sql.

 - Verificar que el persistentVolume funciona eliminando el pod y conectandose al nuevo:

 `kubectl delete pod $(kubectl get pod |grep invoices-svc-mysql|awk '{print $1}') #BORRO`

 `kubectl exec -it $(kubectl get pod |grep invoices-svc-mysql|awk '{print $1}') /bin/bash #CONECTO AL NUEVO`

---
* Realizar una consulta al frontend:

 `minikube service ambassador --url #NOS DEVUELVE LA URL PARA ACCEDER A invoice_svc`

 - Desde el navegador ingresar la url para acceder al frontend_svc, ingresar luego un id válido.

 - Utilizando curl podemos consultar directamente a invoices_svc:

 `curl http://<url>/invoices/<invoice_id> -H 'authorization: <token>' # ver token en kube/auth_svc.yml`

---

* Definicion de la infraestructura:

<imagen>

---
Fuentes:
* Hackernoon gettin started with microservices and kubernetes: https://hackernoon.com/getting-started-with-microservices-and-kubernetes-76354312b556

* Persistent Volumes MySQL: https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/

* Build a Weather Website in with NodeJS + Express: https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b
