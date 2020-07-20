# Setup on Ubuntu

1. clone this repo
2. `yarn install`
3. install [MicroK8s](https://microk8s.io/)

   ```bash
   sudo snap install microk8s --classic

   # make accessable without sudo
   sudo usermod -a -G microk8s $USER
   sudo chown -f -R $USER ~/.kube
   su - $USER

   # tell docker, that the local registry is ok to use
   sudo cp daemon.json /etc/docker/daemon.json
   sudo systemctl restart docker

   # point kubectl command to microk8s.kubectl
   sudo snap alias microk8s.kubectl kubectl
   ```

4. `microk8s enable dns ingress registry`
5. setup mongodb replica set on the kubernetes cluster

   ```bash
   git clone https://github.com/mongodb/mongodb-kubernetes-operator
   cd mongodb-kubernetes-operator

   microk8s.kubectl create namespace mongodb
   microk8s.kubectl create -f deploy/crds/mongodb.com_mongodb_crd.yaml
   microk8s.kubectl create -f deploy/ --namespace mongodb

   cd ..
   microk8s.kubectl apply -f mongodb.yaml -n mongodb
   ```

6. `yarn deploy`

# Setup Generally

1. clone this repo
2. `yarn install`
3. Make sure `kubectl` is istalled and it points to a cluster with ingress and container registry enabled
4. Change cluster in the WORKSPACE file (line 65) to your cluster name and image_chroot (line 66) to your registry
5. setup mongodb replica set on the kubernetes cluster

   ```bash
   git clone https://github.com/mongodb/mongodb-kubernetes-operator
   cd mongodb-kubernetes-operator

   kubectl create namespace mongodb
   kubectl create -f deploy/crds/mongodb.com_mongodb_crd.yaml
   kubectl create -f deploy/ --namespace mongodb

   cd ..
   kubectl apply -f mongodb.yaml -n mongodb
   ```

6. `yarn deploy`

# Issue

I've created this repository, because I wanted to showcase a connection issue. But after creating it from scratch it seems as if there is no issue 🤦

Related issue link: https://github.com/mongodb/mongodb-kubernetes-operator/issues/108
