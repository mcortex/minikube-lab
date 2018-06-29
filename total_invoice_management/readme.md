Sistema de consulta por numero de factura (invoice_id) utilizando microservicios:
Como ejecutar:
* Build de las imagenes:

 `docker build -t invoices_svc:v2 invoices_svc`

 `docker build -t auth_svc:v1 auth_svc`

 `docker build -t expected_date_svc:v1 expected_date_svc`

* Activamos deployments y services:

 `kubectl apply -f kube`

* Verificar que estan levantados los pods:

 `kubectl get pods -o wide`

* Verificar servicios:

 `kubectl get services -o wide`

* Verificar deployments:

 `kubectl get deploy -o wide`

* Realizar una consulta al frontend:

 `minikube service ambassador --url #NOS DEVUELVE EL SOCKET PARA ACCEDER A invoice_svc`

 `curl http://<socket>/invoices/<invoice_id> -H 'authorization: <token>' # ver token en kube/auth_svc.yml`

---

* Pendiente:

 Agregar Base de Datos.
 Agregar PV y PVC Asociados a la Base de Datos.

---
Extracted from hackernoon's gettin started with microservices and kubernetes:
https://hackernoon.com/getting-started-with-microservices-and-kubernetes-76354312b556
