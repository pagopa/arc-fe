# Secret
data "azurerm_key_vault" "key_vault" {
  name                = "${var.prefix}-${var.env_short}-${var.location_short}-cittadini-kv"
  resource_group_name = "${var.prefix}-${var.env_short}-${var.location_short}-cittadini-sec-rg"
}

data "azurerm_key_vault" "key_vault_core" {
  count               = var.env_short == "p" ? 1 : 0
  name                = "${var.prefix}-${var.env_short}-${var.location_short}-core-kv"
  resource_group_name = "${var.prefix}-${var.env_short}-${var.location_short}-core-sec-rg"
}

# Github
data "github_organization_teams" "all" {
  root_teams_only = true
  summary_only    = true
}

# Key Vault - Username E2E
data "azurerm_key_vault_secret" "username_test" {
  count        = contains(["d", "u"], var.env_short) ? 1 : 0
  key_vault_id = data.azurerm_key_vault.key_vault.id
  name         = "e2e-username"
}

# Key Vault - Passowrd E2E
data "azurerm_key_vault_secret" "password_test" {
  count        = contains(["d", "u"], var.env_short) ? 1 : 0
  key_vault_id = data.azurerm_key_vault.key_vault.id
  name         = "e2e-password"
}

# Key Vault - Sonar Token
data "azurerm_key_vault_secret" "sonar_token" {
  count = var.env_short == "p" ? 1 : 0

  key_vault_id = data.azurerm_key_vault.key_vault_core[count.index].id
  name         = "sonar-cloud-token"
}


