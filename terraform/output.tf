output "resource_group_id" {
  value = azurerm_resource_group.rg.id
}

output "login_server" {
  value = "${azurerm_container_registry.example.login_server}"
}
