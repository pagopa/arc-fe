locals {
  # Repo
  github = {
    org        = "pagopa"
    repository = "arc-fe"
  }

  repo_secrets = var.env_short == "p" ? {
    SONAR_TOKEN  = data.azurerm_key_vault_secret.sonar_token[0].value
    E2E_USERNAME = try(data.azurerm_key_vault_secret.username_test[0].value, "")
    E2E_PASSWORD = try(data.azurerm_key_vault_secret.password_test[0].value, "")
  } : {}

  env_variables = contains(["d", "u"], var.env_short) ? {} : {}

  env_secrets = contains(["d", "u"], var.env_short) ? {} : {}

  map_repo = {
    "dev" : "*",
    "uat" : "uat"
    "prod" : "main"
  }
}
