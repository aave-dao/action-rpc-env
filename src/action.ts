import { ChainId, getNetworkEnv, getRPCUrl } from "@aave-dao/toolbox";
import { debug, exportVariable, getInput, warning } from "@actions/core";

const alchemyKey = getInput("ALCHEMY_API_KEY") || undefined;
const quicknodeToken = getInput("QUICKNODE_TOKEN") || undefined;
const quicknodeEndpointName = getInput("QUICKNODE_ENDPOINT_NAME") || undefined;

/**
 * Iterates over the supported chain ids and sets the corresponding env var.
 * Resolution order: explicit env var, Alchemy, Quicknode, public rpc.
 */
for (const chainId of Object.values(ChainId)) {
  const envVarName = getNetworkEnv(chainId);
  const url = getRPCUrl(chainId, {
    alchemyKey,
    quicknodeToken,
    quicknodeEndpointName,
  });
  if (!url) {
    warning(`No rpc available for ${envVarName} (chainId ${chainId})`);
    continue;
  }
  debug(`Setting ${envVarName}`);
  exportVariable(envVarName, url);
}
