terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
  backend "kubernetes" {}
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_deployment" "identity_app_auth" {
  metadata {
    name      = "${var.environment_prefix}${var.project_name}"
    namespace = var.namespace
    labels = {
      app = "${var.environment_prefix}${var.project_label}"
    }
  }

  spec {
    replicas = var.project_replicas_count
    selector {
      match_labels = {
        app = "${var.environment_prefix}${var.project_name}"
      }
    }
    template {
      metadata {
        labels = {
          app = "${var.environment_prefix}${var.project_name}"
        }
      }
      spec {
        image_pull_secrets {
          name = "${var.namespace}-do-registry"
        }
        container {
          image             = "${var.do_registry_name}/${var.project_name}:${var.project_image_tag}"
          name              = "${var.environment_prefix}${var.project_name}-container"
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
        }
      }
    }
  }
}

resource "kubernetes_service" "identity_app_auth" {
  metadata {
    name      = "${var.environment_prefix}${var.project_name}"
    namespace = var.namespace
    labels = {
      app = "${var.environment_prefix}${var.project_name}"
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
