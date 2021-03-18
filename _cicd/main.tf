terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
  backend "kubernetes" {
    secret_suffix    = "identity-app-auth"
    load_config_file = true
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

// resource "kubernetes_secret" "identity" {
//   metadata {
//     name      = var.project_secrets_name
//     namespace = var.namespace
//   }
//   data = {
//     Broker_Host = var.settings_broker_connection_string
//   }
// }

resource "kubernetes_deployment" "identity_app_auth" {
  metadata {
    name      = var.project_name
    namespace = var.namespace
    labels = {
      app = var.project_label
    }
  }

  spec {
    replicas = var.project_replicas_count
    selector {
      match_labels = {
        app = var.project_name
      }
    }
    template {
      metadata {
        labels = {
          app = var.project_name
        }
      }
      spec {
        image_pull_secrets {
          name = "${var.namespace}-do-registry"
        }
        container {
          image             = "${var.do_registry_name}/${var.project_name}:${var.project_image_tag}"
          name              = "${var.project_name}-container"
          image_pull_policy = "Always"
          resources {
            limits = {
              cpu    = "100m"
              memory = "100Mi"
            }
            requests = {
              cpu    = "50m"
              memory = "50Mi"
            }
          }
          port {
            container_port = 80
            protocol       = "TCP"
          }
          //           env_from {
          //             secret_ref {
          //               name = var.project_secrets_name
          //             }
          //           }
        }
      }
    }
  }
}

resource "kubernetes_service" "identity_app_auth" {
  metadata {
    name      = var.project_name
    namespace = var.namespace
    labels = {
      app = var.project_name
    }
  }
  spec {
    type = "ClusterIP"
    port {
      name        = "http"
      port        = var.project_service_port
      target_port = 80
      protocol    = "TCP"
    }
    selector = {
      app = kubernetes_deployment.identity_app_auth.spec.0.template.0.metadata.0.labels.app
    }
  }
}
