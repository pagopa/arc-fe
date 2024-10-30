locals {
  # Repo
  github = {
    org        = "pagopa"
    repository = "arc-fe"
  }

  repo_secrets = var.env_short == "p" ? {
    SONAR_TOKEN = data.azurerm_key_vault_secret.sonar_token[0].value
  } : {}

  env_variables = contains(["d", "u"], var.env_short) ? {
    API_HOST              = "https://api.${var.env}.cittadini.pagopa.it/arc/v1"
    CHECKOUT_HOST         = "https://${var.env}.checkout.pagopa.it"
    CHECKOUT_PLATFORM_URL = "https://api.${var.env}.platform.pagopa.it/checkout/ec/v1"
    LOGIN_URL             = "https://api.${var.env}.cittadini.pagopa.it/arc/v1/login/oneidentity"
  } : {}

  env_secrets = {
    E2E_USERNAME = try(data.azurerm_key_vault_secret.username_test[0].value, "")
    E2E_PASSWORD = try(data.azurerm_key_vault_secret.password_test[0].value, "")
  }

  map_repo = {
    "dev" : "*",
    "uat" : "uat"
    "prod" : "main"
  }
}
